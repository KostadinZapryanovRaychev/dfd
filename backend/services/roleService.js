const Role = require("../models/RoleModel");

const createRole = async (roleData) => {
  try {
    const role = await Role.create(roleData);
    return role;
  } catch (error) {
    throw new Error("Error creating role");
  }
};

const getAllRoles = async () => {
  try {
    const roles = await Role.findAll();
    return roles;
  } catch (error) {
    throw new Error("Error fetching all roles");
  }
};

const getRoleById = async (roleId) => {
  try {
    const role = await Role.findByPk(roleId);
    return role;
  } catch (error) {
    throw new Error("Error fetching role");
  }
};

const updateRoleById = async (roleId, roleData) => {
  try {
    const role = await Role.findByPk(roleId);

    if (!role) {
      throw new Error("Role not found");
    }

    await role.update(roleData);
    return role;
  } catch (error) {
    throw new Error("Error updating role");
  }
};

const deleteRoleById = async (roleId) => {
  try {
    const role = await Role.findByPk(roleId);

    if (!role) {
      throw new Error("Role not found");
    }

    await role.destroy();
  } catch (error) {
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
