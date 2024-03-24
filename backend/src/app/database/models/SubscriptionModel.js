const Sequelize = require("sequelize");
const db = require("../../../../config/db");

const Subscription = db.define(
  "Subscription",
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
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { tableName: "subscriptions" }
);

module.exports = Subscription;
