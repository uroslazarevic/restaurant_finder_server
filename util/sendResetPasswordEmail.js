const { resetPasswordEmail } = require('./sendgrid');
const { User } = require('../models');

const sendResetPasswordEmail = async (res, email) => {
    // Create reset password token
    const resetPasswordToken = User.generateToken({ email, password: 'reset' });
    // Send reset password token
    resetPasswordEmail(email, resetPasswordToken);
    return res.status(200).json({
        message: 'Reset password email has been sent.',
    });
};
module.exports = {
    sendResetPasswordEmail,
};
