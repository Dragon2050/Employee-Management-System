const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { authAPI } = require('../utils/apiEndpoints');
const {
    login,
} = require('../services/authService');

// ? API to sign in
router.post(
    authAPI.LOGIN,
    [
        body('type', 'type must be email or refresh').isIn(['email', 'refresh'])
    ],
    login
);

module.exports = router;