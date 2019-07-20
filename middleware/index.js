const { checkAuth } = require('./checkAuth');
const { resetPasswordValidator } = require('./resetPasswordValidator');
const { signupValidator } = require('./signupValidator');

module.exports = {
    checkAuth,
    signupValidator,
    resetPasswordValidator,
};
