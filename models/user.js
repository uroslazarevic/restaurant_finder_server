const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            username: { type: DataTypes.STRING, allowNull: false },
            email: { type: DataTypes.STRING, allowNull: false },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                // validate: {
                // checkPassword(value) {
                //     console.log('PASSWORD 11', value, value.length);
                //     if (value.toLowerCase() === 'password' || value.toLowerCase() === 'qwerty') {
                //         throw new Error('Password is forbidden, please choose another');
                //     }
                //     if (value.length < 6) {
                //         throw new Error('Password must be atleast 6 chars long');
                //     }
                //     if (value.length > 12) {
                //         throw new Error('Password is to long must not exceed 12 chars');
                //     }
                // },
                // },
            },
            confirmed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        },
        {
            hooks: {
                beforeCreate: async (user) => {
                    const hash = await user.generateHash(user.password);
                    user.email = user.email.toLowerCase();
                    user.password = hash;
                    console.log('BEFORE CREATE CALLED');
                },
                // beforeUpdate: async (user) => {
                //     console.log('PASSWORD 222', user.password, user.password.length);
                //     const hash = await bcrypt.hash(user.password, 8);
                //     user.email = user.email.toLowerCase();
                //     user.password = hash;
                // },
            },
            // Enables lowercase model properties and table name in db
            underscored: true,
        }
    );
    User.associate = function(models) {
        // associations can be defined here
        User.hasMany(models.Token, { foreignKey: 'user_id', onDelete: 'cascade' });
        User.hasMany(models.Collection, { foreignKey: 'user_id', onDelete: 'cascade' });
    };

    User.generateToken = (password) => {
        const token = jwt.sign({ password }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    };

    User.prototype.generateHash = async (password) => {
        const hash = await bcrypt.hash(password, 8);
        return hash;
    };
    User.prototype.validatePassword = async (password, hashedPassword) => {
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    };

    User.prototype.verifyAccount = async (user, token) => {
        /*
        *Remove association method* - just removes the associated foreign_key
        from the token table
        To destroy it use token.destroy()
        */
        user.confirmed = true;
        await token.destroy();
        await user.save();
    };

    return User;
};
