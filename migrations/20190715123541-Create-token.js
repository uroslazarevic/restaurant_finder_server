'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('tokens', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            token: { type: Sequelize.STRING, allowNull: false },
            userId: { type: Sequelize.UUID, allowNull: false, field: 'user_id' },
            createdAt: {
                type: Sequelize.DATE,
                field: 'created_at',
            },
            updatedAt: {
                type: Sequelize.DATE,
                field: 'updated_at',
            },
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('tokens');
    },
};
