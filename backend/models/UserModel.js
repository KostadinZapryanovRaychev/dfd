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
    roleId: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    profession: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    cv: {
      type: Sequelize.BLOB("long"),
      allowNull: true,
      defaultValue: null,
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    company: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  { tableName: "users" }
);

const Role = require("./RoleModel");

User.belongsTo(Role, { foreignKey: "roleId" });

module.exports = User;
