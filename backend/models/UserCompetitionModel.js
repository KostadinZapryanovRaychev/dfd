const Sequelize = require("sequelize");
const db = require("../config/db");
const User = require("./UserModel");
const Competition = require("./CompetitionModel");

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
  },
  { tableName: "user_competitions" }
);

UserCompetition.belongsTo(User);
UserCompetition.belongsTo(Competition);

UserCompetition.sync().then(() => {
  console.log("UserCompetition table created");
});

module.exports = UserCompetition;
