'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                type: Sequelize.UUID,
            },
            username: { type: Sequelize.STRING, allowNull: false },
            email: { type: Sequelize.STRING, allowNull: false },
            password: { type: Sequelize.TEXT, allowNull: false },
            confirmed: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
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
        return queryInterface.dropTable('users');
    },
};
