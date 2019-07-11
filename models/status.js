module.exports = (sequelize, DataTypes) => {
    const Status = sequelize.define(
        'Status',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
            },
            name: { type: DataTypes.STRING, allowNull: false },
        },
        {
            underscored: true,
        }
    );
    Status.associate = function() {
        // associations can be defined here
    };
    return Status;
};
