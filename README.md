## README

#### Get the code

-   git clone https://github.com/uroslazarevic/restaurant_finder_server.git
-   cd restaurant_finder_server

#### How to run

-   Install npm packages using npm install or yarn install.
-   To run application, you can either use script commands:

    1. npm start or yarn start, which executes "node app.js",
    2. npm run start-dev or yarn run start-dev, which executes "nodemon app.js"

-   File app.js is located in the root of the project, and in that file resides logic for starting the server

#### Configurations

Config file is located in config/config.js. The config file has two sections i.e. development and production.
By default the config in development environment is loaded using Envirnoment Varaibles which are:
DB_USERNAME
DB_PASSWORD
DB_DATABASE
DB_HOST
DB_DIALECT

Alternatively you can also set use_env_variable with a name of an Envirnoment Varaible that contains the connection string.

-   In models/index.js we are loading config.js for configuring sequelize instance. Also, models/index.js exports db variable, which holds our sequelize instance and defined models.

The server listens on port 3000 by default which can be changed by setting the port Envirnoment Varaible
