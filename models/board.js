module.exports = (sequelize, DataTypes) => {
    const Board = sequelize.define(
        'Board',
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
    Board.associate = function() {
        // associations can be defined here
    };
    return Board;
};
