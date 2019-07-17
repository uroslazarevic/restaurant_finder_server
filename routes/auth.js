const { User } = require('../models');
const express = require('express');
const { body } = require('express-validator');

const auth = require('../contollers/auth');

const router = express.Router();

router.post(
    '/signup',
    [
        // Place custom validator on the end
        body('email')
            .trim()
            .isEmail()
            .withMessage('Please enter a valid email')
            .custom(async (email) => {
                email = email.toLowerCase();
                const result = await User.findOne({ where: { email } });
                if (result) {
                    throw new Error('Email address already in use');
                }
                return true;
            }),
        body('username', 'Please enter a username with at least 2 characters.')
            .trim()
            .isLength({ min: 2 }),
        body('password').custom((value) => {
            console.log('PASSWORD 11', value, value.length);
            if (value.toLowerCase() === 'password' || value.toLowerCase() === 'qwerty') {
                throw new Error('Password is forbidden, please choose another');
            }
            if (value.length < 6) {
                throw new Error('Password must be atleast 6 chars long');
            }
            if (value.length > 12) {
                throw new Error('Password is to long must not exceed 12 chars');
            }
            return true;
        }),
    ],
    auth.signup
);
router.post('/confirm-email', auth.confirmEmail);
router.post('/signin', auth.signin);
router.post('/logout', auth.logout);

module.exports = router;
