const Sequelize = require("sequelize");
const db = require("../../../../config/db");

const Role = db.define(
  "Role",
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
  },
  { tableName: "roles" }
);

module.exports = Role;
