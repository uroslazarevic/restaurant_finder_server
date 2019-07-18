const express = require('express');

const { checkAuth, signupValidator } = require('../middleware');
const auth = require('../contollers/auth');

const router = express.Router();

router.post('/signup', [...signupValidator], auth.signup);
router.post('/signin', auth.signin);
router.post('/signout', auth.signout);
router.post('/confirm-email', auth.confirmEmail);
router.post('/test', [checkAuth], auth.test);

module.exports = router;
