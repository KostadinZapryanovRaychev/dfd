const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

// Database connection and configuration
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    define: {
      timestamps: false,
      underscored: true,
    },
    logging: false,
  }
);

module.exports = sequelize;
