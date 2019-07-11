const uuidv4 = require('uuid/v4');

('use strict');

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert(
            'boards',
            [
                {
                    id: uuidv4(),
                    name: 'Development',
                    ['created_at']: new Date(),
                    ['updated_at']: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Testing',
                    ['created_at']: new Date(),
                    ['updated_at']: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Deployment',
                    ['created_at']: new Date(),
                    ['updated_at']: new Date(),
                },
            ],
            {
                underscored: true,
            }
        );
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('boards', null, {});
    },
};
