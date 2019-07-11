module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define(
        'Task',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            name: { type: DataTypes.STRING, allowNull: false },
        },
        {
            underscored: true,
        }
    );
    Task.associate = function(models) {
        // associations can be defined here
        Task.belongsTo(models.User, { foreignKey: 'user_id' });
        Task.belongsTo(models.Board, { foreignKey: 'board_id' });
        Task.belongsTo(models.Status, { foreignKey: 'status_id' });
    };
    return Task;
};
