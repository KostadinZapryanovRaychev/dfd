const roleService = require("../services/roleService");
const errorMessages = require("../../../../constants/errors");

exports.createRole = async (req, res) => {
  try {
    const role = await roleService.createRole(req.body);
    res.status(201).json({ message: "Role created successfully", role });
  } catch (error) {
    console.log("Error creating role:", error);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await roleService.getAllRoles();
    res.status(200).json({ roles });
  } catch (error) {
    console.log("Error fetching all roles:", error);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};

exports.getRoleById = async (req, res) => {
  const { roleId } = req.params;

  try {
    const role = await roleService.getRoleById(roleId);
    res.status(200).json({ role });
  } catch (error) {
    console.log("Error fetching role:", error);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};

exports.updateRoleById = async (req, res) => {
  const { roleId } = req.params;

  try {
    const role = await roleService.updateRoleById(roleId, req.body);
    res.status(200).json({ message: "Role updated successfully", role });
  } catch (error) {
    console.log("Error updating role:", error);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};

exports.deleteRoleById = async (req, res) => {
  const { roleId } = req.params;

  try {
    await roleService.deleteRoleById(roleId);
    res.status(204);
  } catch (error) {
    console.log("Error deleting role:", error);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};
