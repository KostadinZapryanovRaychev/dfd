const dotenv = require("dotenv");
dotenv.config();

const db = require("./config/db");
const Role = require("./models/RoleModel");
const User = require("./models/UserModel");
const Competition = require("./models/CompetitionModel");
const UserRole = require("./models/UserRoleModel");
const UserCompetition = require("./models/UserCompetitionModel");

User.belongsTo(Role, { foreignKey: "roleId" });

UserCompetition.belongsTo(User);
UserCompetition.belongsTo(Competition);

const synchronizeModels = async () => {
  try {
    await db.sync();
    console.log("All tables synchronized");
  } catch (error) {
    console.error("Error synchronizing tables:", error);
  } finally {
    db.close();
  }
};

synchronizeModels();
