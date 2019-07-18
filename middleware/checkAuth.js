const { Token } = require('../models');

exports.checkAuth = async (req, res, next) => {
    try {
        const tokenString = req.header('Authorization').replace('Bearer ', '');
        await Token.validateToken(tokenString);
        const token = await Token.findOne({ where: { token: tokenString } });
        if (!token) {
            return res.status(500).json({ message: 'Server error. Token not found' });
        }
        const user = await token.getUser();
        if (!user) {
            return res.status(500).json({ message: 'Server error. User not found' });
        }
        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
};
