const { verificationEmail } = require('./sendgrid');
const { User } = require('../models');

const sendVerificationEmail = async (res, formData) => {
    const { username, password, email } = formData;
    // Create verification token
    const verificationToken = User.generateToken({ email, password });
    // Send verification email
    verificationEmail(email, username, verificationToken);
    return res.status(201).json({
        message: 'Signup successfull! We have sent you an email, please confirm your account.',
    });
};
module.exports = {
    sendVerificationEmail,
};
