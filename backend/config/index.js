const dotenv = require("dotenv");
dotenv.config();

const db = require("./db");
const Role = require("../src/app/database/models/RoleModel");
const User = require("../src/app/database/models/UserModel");
const Competition = require("../src/app/database/models/CompetitionModel");
const UserRole = require("../src/app/database/models/UserRoleModel");
const UserCompetition = require("../src/app/database/models/UserCompetitionModel");
const Transaction = require("../src/app/database/models/TransactionModel");

User.belongsTo(Role, { foreignKey: "roleId" });

Transaction.belongsTo(User);
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
