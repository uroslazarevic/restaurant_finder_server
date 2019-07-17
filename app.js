const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./models').sequelize;
const app = express();

// routes
const auth = require('./routes/auth');
// routes

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json('application/json'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(auth);

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message || 'Server error';
    res.status(status).json({ message });
});

sequelize
    .sync({
        force: false, // To create table if exists , so make it false
        logging: false,
    })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Example app listening on port ${process.env.PORT}!`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
