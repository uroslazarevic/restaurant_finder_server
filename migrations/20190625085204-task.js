'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('tasks', {
            id: {
                defaultValue: Sequelize.UUIDV1,
                primaryKey: true,
                type: Sequelize.UUID,
            },
            name: {
                type: Sequelize.STRING,
            },

            userId: {
                type: Sequelize.UUID,
                field: 'user_id',
            },
            boardId: {
                type: Sequelize.UUID,
                field: 'board_id',
            },
            statusId: {
                type: Sequelize.UUID,
                field: 'status_id',
            },
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
        return queryInterface.dropTable('tasks');
    },
};
