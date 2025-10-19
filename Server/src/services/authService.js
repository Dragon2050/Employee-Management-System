const { validationResult } = require('express-validator');
const User = require('../Models/User');
const { checkHash } = require('../common/managePass');
const { generateToken } = require('../common/manageToken');
const { loginType } = require('../utils/enums');
const { decriptToken } = require('../common/manageToken');

// * Function to handle login with email
const emailLogin = async (email, password, res) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            const isValid = await checkHash(password, user.password);
            if (!isValid) {
                res.status(401).json({ message: 'Password does not match' });
            } else {
                const accessToken = generateToken({ email, id: user._id.toString(), type: user.type}, '1d');
                const refreshToken = generateToken({ id: user._id.toString() }, '6d');
                res.status(200).json({ message: 'Login successfull', user, accessToken, refreshToken });
            }
        }
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}

// * Function to handle login with refresh token
const tokenLogin = async (token, res) => {
    try {
        const id = decriptToken(token);
        const user = await User.findById(id);
        if (!user) {
            res.status(401).json({ message: 'Unauthorized token' });
        } else {
            const accessToken = generateToken(
                {
                    email: user.email,
                    id: user._id.toString(),
                    type: user.type
                },
                '1d'
            );
            const refreshToken = generateToken({ id: user._id.toString() }, '6d');
            res.status(200).json({ message: 'Login successfull', user, accessToken, refreshToken });
        }
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}

// * Function to log in
const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ message: errors })
        } else {
            const { email, password, type } = req.body;
            if (type === loginType.EMAIL) {
                if (!email) {
                    res.status(404).json({ message: 'Email not found' });
                } else if (!password) {
                    res.status(403).json({ message: 'Password need to be provided' });
                } else {
                    await emailLogin(email, password, res);
                }
            } else if (type === loginType.REFRESH) {
                await tokenLogin(req?.body?.refreshToken, res);
            }
        }
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = {
    login,
};
