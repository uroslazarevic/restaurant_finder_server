const uuidv4 = require('uuid/v4');

('use strict');

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert(
            'users',
            [
                {
                    id: uuidv4(),
                    name: 'John Doe',
                    email: 'johndoe@gmail.com',
                    ['google_drive_token']: '',
                    ['one_drive_token']: '',
                    ['dropbox_token']: '',
                    ['created_at']: new Date(),
                    ['updated_at']: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Uroš Lazarević',
                    email: 'uros.lazarevic.la@gmail.com',
                    ['google_drive_token']: '',
                    ['one_drive_token']: '',
                    ['dropbox_token']: '',
                    ['created_at']: new Date(),
                    ['updated_at']: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Mark Walhberg',
                    email: 'mwarhberg@gmail.com',
                    ['google_drive_token']: '',
                    ['one_drive_token']: '',
                    ['dropbox_token']: '',
                    ['created_at']: new Date(),
                    ['updated_at']: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Doora Gray',
                    email: 'dooragray@gmail.com',
                    ['google_drive_token']: '',
                    ['one_drive_token']: '',
                    ['dropbox_token']: '',
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
        return queryInterface.bulkDelete('users', null, {});
    },
};
