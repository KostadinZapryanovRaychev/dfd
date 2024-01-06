const Sequelize = require("sequelize");
const db = require("../config/db");

const UserCompetition = db.define(
  "UserCompetition",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    grade: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    competitionId: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  },
  { tableName: "user_competitions" }
);

module.exports = UserCompetition;
