const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

// Database connection and configuration
const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    dialect:  'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    logging: true,
    logQueryParameters: {},
});

module.exports = sequelize;
