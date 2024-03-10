const Role = require("../../database/models/RoleModel");

const createRole = async (roleData) => {
  try {
    const role = await Role.create(roleData);
    return role;
  } catch (error) {
    console.log("Role service", error);
    throw new Error("Error creating role");
  }
};

const getAllRoles = async () => {
  try {
    const roles = await Role.findAll();
    return roles;
  } catch (error) {
    console.log("Role service", error);
    throw new Error("Error fetching all roles");
  }
};

const getRoleById = async (roleId) => {
  try {
    const role = await Role.findByPk(roleId);
    return role;
  } catch (error) {
    console.log("Role service", error);
    throw new Error("Error fetching role");
  }
};

const updateRoleById = async (roleId, roleData) => {
  try {
    const role = await Role.findByPk(roleId);
    await role.update(roleData);
    return role;
  } catch (error) {
    console.log("Role service", error);
    throw new Error("Error updating role");
  }
};

const deleteRoleById = async (roleId) => {
  try {
    const role = await Role.findByPk(roleId);
    await role.destroy();
  } catch (error) {
    console.log("Role service", error);
    throw new Error("Error deleting role");
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRoleById,
  deleteRoleById,
};
