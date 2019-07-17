// Import validation library
const { validationResult } = require('express-validator');
const { sendVerificationEmail } = require('../util/sendVerificationEmail');
const { User, Token } = require('../models');

exports.signup = async (req, res, next) => {
    const formData = req.body;
    try {
        // Validation with express-validator
        const errors = validationResult(req).errors;
        if (errors.length !== 0) {
            let error;
            // Just show first error msg
            if (errors.length === 1 && errors[0].msg === 'Email address already in use') {
                error = new Error(errors[0].msg);
                const user = await User.findOne({ where: { email: formData.email } });
                if (user && !user.confirmed) {
                    // Update username and password of matched user(email is the same)
                    const hash = await user.generateHash(formData.password);
                    await user.update({ password: hash, username: formData.username });
                    // Remove previous verification token
                    const tokens = await user.getTokens();
                    await tokens.forEach(async (token) => {
                        await token.destroy();
                    });
                    return sendVerificationEmail(res, user.id, formData);
                }
                error.statusCode = 403;
                throw error;
            }
            error = new Error(errors[1].msg);
            error.statusCode = 401;
            throw error;
        }

        // Create user
        const user = await User.create({ ...formData });
        sendVerificationEmail(res, user.id, formData);
    } catch (err) {
        if (err.errors) {
            const { message } = err.errors[0];
            err.message = message;
            err.statusCode = 403;
        }
        next(err);
    }
};

exports.confirmEmail = async (req, res, next) => {
    const { verificationToken } = req.body;
    try {
        const token = await Token.findOne({ where: { token: verificationToken } });
        if (!token) {
            return res.status(404).json({ message: 'Token not found' });
        }
        const user = await token.getUser();
        const decodedToken = await Token.validateToken(verificationToken);
        const match = await user.validatePassword(decodedToken.password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Token is not valid' });
        }
        await user.verifyAccount(user, token);
        res.json({ message: 'Email verified' });
    } catch (err) {
        next(err);
    }
};
exports.signin = async (req, res, next) => {
    const { password, email } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        // User doesn't exists
        if (!user) {
            return res.status(401).json({ message: 'Incorrect password or email' });
        }
        const match = await user.validatePassword(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Incorrect password or email' });
        }
        // // Generate auth token
        const token = User.generateToken(password);
        await user.createToken({ token });
        res.status(200).json({
            authData: { token, userId: user.id, expiresIn: '3600', username: user.username },
            message: 'Login successfull!',
        });
    } catch (err) {
        next(err);
    }
};
exports.logout = async (req, res, next) => {
    try {
        res.json({ message: 'logout' });
    } catch (err) {
        next(err);
    }
};

// exports.requestToken = async (req, res, next) => {
//     try {
//         const { code, state } = req.body;
//         if (state !== dropboxApi.state) {
//             return res.status(403).json({ error: 'Forbidden' });
//         }

//         const response = await dropboxApi.onRequestToken(code);
//         if (response.code) {
//             const error = new Error(response.message);
//             error.statusCode = response.code;
//             throw error;
//         }
//         res.json({ token: response });
//     } catch (err) {
//         next(err);
//     }
// };
