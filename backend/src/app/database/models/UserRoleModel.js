const Sequelize = require("sequelize");
const db = require("../../../../config/db");

const UserRole = db.define(
  "UserRole",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  },
  { tableName: "userroles" }
);

const User = require("./UserModel");
const Role = require("./RoleModel");

User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

module.exports = UserRole;
