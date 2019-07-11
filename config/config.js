require('dotenv').config();

// Delete dummyDevelopmentConfig after you've set your DB configs
const dummyDevelopmentConfig = {
    username: 'Your DB connection settings user',
    password: 'Your DB connection settings password',
    database: 'Your DB connection settings DB namee',
    host: 'localhost',
    dialect: 'postgres',
};
// Delete dummyDevelopmentConfig after you've set your DB configs

module.exports = {
    development: {
        username: process.env.DB_USERNAME || dummyDevelopmentConfig.username,
        password: process.env.DB_PASSWORD || dummyDevelopmentConfig.password,
        database: process.env.DB_NAME || dummyDevelopmentConfig.database,
        host: 'localhost',
        dialect: 'postgres',
    },
    test: {
        username: 'root',
        password: null,
        database: 'database_test',
        host: '127.0.0.1',
        dialect: 'postgres',
    },
    production: {
        username: 'root',
        password: null,
        database: 'database_production',
        host: '127.0.0.1',
        dialect: 'postgres',
    },
};
