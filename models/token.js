const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
    const Token = sequelize.define(
        'Token',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            token: { type: DataTypes.STRING, allowNull: false },
        },
        {
            underscored: true,
        }
    );
    Token.associate = function(models) {
        // associations can be defined here
        Token.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'cascade' });
    };

    Token.validateToken = async (token) => {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            console.log('DECODED TOKEN ERR', err);
            const error = new Error('Unauthorized access.');
            error.statusCode = 401;
            throw error;
        }
    };
    return Token;
};
