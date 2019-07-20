// Import validation library
const { validationResult } = require('express-validator');
const { sendVerificationEmail } = require('../util/sendVerificationEmail');
const { sendResetPasswordEmail } = require('../util/sendResetPasswordEmail');
const { User, Token } = require('../models');

exports.signup = async (req, res, next) => {
    const formData = req.body;
    try {
        // Validation with express-validator
        const errors = validationResult(req).errors;
        if (errors.length !== 0) {
            let error;
            console.log(errors);
            // Just show first error msg
            if (errors.length === 1 && errors[0].msg === 'Email address already in use') {
                error = new Error(errors[0].msg);
                const user = await User.findOne({ where: { email: formData.email } });
                if (user && !user.confirmed) {
                    // Update username and password of matched user(email is the same)
                    const hash = await user.generateHash(formData.password);
                    await user.update({ password: hash, username: formData.username });
                    return sendVerificationEmail(res, formData);
                }
                error.statusCode = 403;
                throw error;
            }
            error = new Error(errors[0].msg);
            error.statusCode = 401;
            throw error;
        }

        // Create user
        await User.create({ ...formData });
        sendVerificationEmail(res, formData);
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
        const decodedToken = await Token.validateToken(verificationToken);
        const user = await User.findOne({ where: { email: decodedToken.email } });
        if (!user) {
            return res.status(404).json({ message: 'Server error. User not found' });
        }
        const match = await user.validatePassword(decodedToken.password, user.password);

        if (!match) {
            return res.status(401).json({ message: 'Token is not valid' });
        }
        await user.verifyAccount(user);
        res.json({ message: 'Email verification successfull!' });
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
            return res.status(403).json({ message: 'Incorrect password or email' });
        }
        if (!user.confirmed) {
            return res.status(403).json({ message: 'Access denied. Please verify your account.' });
        }
        const match = await user.validatePassword(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Incorrect password or email' });
        }
        // Generate auth and refresh tokens
        const accessToken = User.generateToken({ password, email }, true);
        const refreshToken = User.generateToken({ password, email });
        await user.createToken({ token: refreshToken, ['user_id']: user.id });
        res.status(200).json({
            authData: {
                tokens: { accessToken, refreshToken },
                userId: user.id,
                expiresIn: '3600',
                username: user.username,
            },
            message: 'Login successfull!',
        });
    } catch (err) {
        next(err);
    }
};
exports.signout = async (req, res, next) => {
    const { userId, refreshToken } = req.body;

    try {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            res.status(500).json({ message: 'Server error. User not found' });
        }
        const tokens = await user.getTokens({ where: { token: refreshToken } });
        if (!tokens) {
            res.status(500).json({ message: 'Server error. Token not found' });
        }
        const refreshTokenInstance = tokens[0];
        await refreshTokenInstance.destroy();
        res.json({ message: 'Logout successfull!' });
    } catch (err) {
        next(err);
    }
};

exports.resetPassword = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res
                .status(403)
                .json({ message: 'This email is not registered with us. Please enter a valid email.' });
        }
        sendResetPasswordEmail(res, email);
    } catch (err) {
        next(err);
    }
};

exports.confirmResetPassword = async (req, res, next) => {
    const { resetPasswordToken, password } = req.body;
    try {
        // Validation with express-validator
        const errors = validationResult(req).errors;
        console.log(errors);
        if (errors.length > 0) {
            const error = new Error(errors[0].msg);
            error.statusCode = 403;
            throw error;
        }
        const decodedToken = await Token.validateToken(resetPasswordToken);
        const user = await User.findOne({ email: decodedToken.email });
        if (!user) {
            return res.status(500).json({ message: 'Server error. User not found' });
        }
        // Change Users password
        const hash = await user.generateHash(password);
        await user.update({ password: hash });
        return res.json({ message: 'Password change successfull!' });
    } catch (err) {
        next(err);
    }
};
exports.refreshToken = async (req, res, next) => {
    const { userId, refreshToken } = req.body;

    try {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            res.status(500).json({ message: 'Server error. User not found' });
        }
        const tokens = await user.getTokens({ where: { token: refreshToken } });
        if (!tokens) {
            return res.status(404).json({ messsage: 'Invalid request' });
        }

        const decodedToken = await Token.validateToken(refreshToken);
        const { password, email } = decodedToken;
        const accessToken = User.generateToken({ password, email }, true);
        res.status(200).json({
            authData: {
                tokens: { accessToken, refreshToken },
                userId: user.id,
                expiresIn: '3600',
                username: user.username,
            },
            message: 'Aceess token refreshed!',
        });
    } catch (err) {
        next(err);
    }
};
