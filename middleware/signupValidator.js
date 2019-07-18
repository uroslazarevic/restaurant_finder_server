const { body } = require('express-validator');
const { User } = require('../models');

exports.signupValidator = [
    // Place custom validator on the end
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please enter a valid email')
        .custom(async (email) => {
            console.log('EMAIL', email);
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
];
