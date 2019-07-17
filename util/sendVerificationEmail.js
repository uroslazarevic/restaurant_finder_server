const { verificationEmail } = require('./sendgrid');
const { User, Token } = require('../models');

const sendVerificationEmail = async (res, userId, formData) => {
    // Create verification token
    const verificationToken = User.generateToken(formData.password);
    // Store verification token in db
    await Token.create({ token: verificationToken, ['user_id']: userId });
    // Send verification email
    verificationEmail(formData.email, formData.username, verificationToken);
    return res.status(201).json({
        message: 'Signup successfull! We have sent you an email, please confirm your account.',
    });
};
module.exports = {
    sendVerificationEmail,
};
