module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
            },
            name: { type: DataTypes.STRING, allowNull: false },
            email: { type: DataTypes.STRING, allowNull: false },
            googleDriveToken: { type: DataTypes.TEXT, allowNull: false, defaultValue: '' },
            oneDriveToken: { type: DataTypes.TEXT, allowNull: false, defaultValue: '' },
            dropboxToken: { type: DataTypes.TEXT, allowNull: false, defaultValue: '' },
        },
        {
            underscored: true,
        }
    );
    User.associate = function() {
        // associations can be defined here
    };
    return User;
};
