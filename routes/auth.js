const express = require('express');

const { signupValidator, resetPasswordValidator } = require('../middleware');
const auth = require('../contollers/auth');

const router = express.Router();

router.post('/signup', [...signupValidator], auth.signup);
router.post('/signin', auth.signin);
router.post('/signout', auth.signout);
router.post('/confirm-email', auth.confirmEmail);
router.post('/token', auth.refreshToken);
router.post('/reset-password', auth.resetPassword);
router.post('/reset-password/confirm', [...resetPasswordValidator], auth.confirmResetPassword);

module.exports = router;
