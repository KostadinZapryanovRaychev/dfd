const Sequelize = require("sequelize");
const db = require("../config/db");

const User = db.define(
  "User",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    isLevel1: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    isLevel2: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    isLevel3: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    isParticipant: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    photo: {
      type: Sequelize.BLOB,
      allowNull: true,
      defaultValue: null,
    },
    approvedAt: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  { tableName: "users" }
);

// Synchronize the model with the database (create the table if it doesn't exist)
User.sync().then(() => {
  console.log("User table created");
});

module.exports = User;
