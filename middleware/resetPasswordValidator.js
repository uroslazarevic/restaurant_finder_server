const { body } = require('express-validator');

exports.resetPasswordValidator = [
    // Place custom validator on the end
    body('password').custom((password) => {
        if (password.toLowerCase() === 'password' || password.toLowerCase() === 'qwerty') {
            throw new Error('Password is forbidden, please choose another');
        }
        if (password.length < 6) {
            throw new Error('Password must be atleast 6 chars long');
        }
        if (password.length > 12) {
            throw new Error('Password is to long must not exceed 12 chars');
        }
        return true;
    }),
];
