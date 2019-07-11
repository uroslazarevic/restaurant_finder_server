const uuidv4 = require('uuid/v4');

('use strict');

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert(
            'statuses',
            [
                {
                    id: uuidv4(),
                    name: 'To Do',
                    ['created_at']: new Date(),
                    ['updated_at']: new Date(),
                },
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
                    name: 'Documentation',
                    ['created_at']: new Date(),
                    ['updated_at']: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Done',
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
        return queryInterface.bulkDelete('statuses', null, {});
    },
};
