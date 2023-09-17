const Sequelize = require("sequelize");
const db = require("../config/db");

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

// Create the Role table in the database
Role.sync().then(() => {
  console.log("Role table created");
});

module.exports = Role;
