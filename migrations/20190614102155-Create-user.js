'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                defaultValue: Sequelize.UUIDV1,
                primaryKey: true,
                type: Sequelize.UUID,
            },
            name: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
            },
            googleDriveToken: { type: Sequelize.TEXT, field: 'google_drive_token' },
            oneDriveToken: { type: Sequelize.TEXT, field: 'one_drive_token' },
            dropboxToken: { type: Sequelize.TEXT, field: 'dropbox_token' },
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
