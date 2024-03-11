const Sequelize = require("sequelize");
const User = require("./UserModel");
const db = require("../../../../config/db");

const Transaction = db.define(
  "Transaction",
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
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    appliedAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  },
  { tableName: "transactions" }
);

Transaction.belongsTo(User, { foreignKey: "userId" });
module.exports = Transaction;
