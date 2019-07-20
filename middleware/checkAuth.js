const { User, Token } = require('../models');

exports.checkAuth = async (req, res, next) => {
    try {
        const tokenString = req.header('Authorization').replace('Bearer ', '');
        const decodedToken = await Token.validateToken(tokenString);
        const user = await User.findOne({ where: { email: decodedToken.email } });
        if (!user) {
            return res.status(500).json({ message: 'Server error. User not found' });
        }
        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
};
