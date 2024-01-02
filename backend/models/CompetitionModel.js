const Sequelize = require("sequelize");
const db = require("../config/db");

const Competition = db.define(
  "Competition",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    logo: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    startsAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    endsAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    award: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    rating: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    requirements: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  { tableName: "competitions" }
);

Competition.sync().then(() => {
  console.log("Competition table created");
});

module.exports = Competition;
