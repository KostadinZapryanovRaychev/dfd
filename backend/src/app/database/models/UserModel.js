const Sequelize = require("sequelize");
const db = require("../../../../config/db");

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
    photoUrl: {
      type: Sequelize.STRING,
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
    isBlocked: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    level: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    subscriptionExpDate: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  { tableName: "users" }
);

const Role = require("./RoleModel");

User.belongsTo(Role, { foreignKey: "roleId" });

module.exports = User;
