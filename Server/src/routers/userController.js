const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { userAPI } = require('../utils/apiEndpoints');
const {
    createUser,
    getUsers,
    getUserByID,
    updateUserByID,
    deleteUserByID,
    getDetailInformation,
    getLastFiveRecrutedEmployee,
} = require('../services/userService');
const { authenticateToken } = require('../middlewares/tokenAuthenticator');

// ? API to sign in
router.post(
    userAPI.CREATE,
    [
        body('fname', 'fname is required').notEmpty(),
        body('lname', 'lname is required').notEmpty(),
        body('email', 'Please enter a valid email').notEmpty().isEmail(),
        body('age', 'age is required').optional().isNumeric(),
        body('password', 'Please enter at least 6 digits').isLength({ min: 6 }),
        body('type', 'type is required').notEmpty(),
        body('type', 'type must be admin or user').isIn(['admin', 'user']),
    ],
    createUser
);

// ? API to get all users
router.get(userAPI.ALL, authenticateToken, getUsers);

// ? API to get user by ID
router.get(userAPI.USER_BY_ID, authenticateToken, getUserByID);

// ? API to update user by ID
router.put(userAPI.USER_BY_ID, authenticateToken, updateUserByID);

// ? API to delete user by ID
router.delete(userAPI.USER_BY_ID, authenticateToken, deleteUserByID);

// ? API to get detail information
router.get(userAPI.DETAIL, authenticateToken, getDetailInformation);

// ? API to get last five recruted employee
router.get(userAPI.GET_LATEST, authenticateToken, getLastFiveRecrutedEmployee);

module.exports = router;