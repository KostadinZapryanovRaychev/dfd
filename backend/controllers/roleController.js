const roleService = require("../services/roleService");

exports.createRole = async (req, res) => {
  try {
    const role = await roleService.createRole(req.body);
    res.status(201).json({ message: "Role created successfully", role });
  } catch (error) {
    console.error("Error creating role:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await roleService.getAllRoles();
    res.status(200).json({ roles });
  } catch (error) {
    console.error("Error fetching all roles:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getRoleById = async (req, res) => {
  const { roleId } = req.params;

  try {
    const role = await roleService.getRoleById(roleId);
    res.status(200).json({ role });
  } catch (error) {
    console.error("Error fetching role:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateRoleById = async (req, res) => {
  const { roleId } = req.params;

  try {
    const role = await roleService.updateRoleById(roleId, req.body);
    res.status(200).json({ message: "Role updated successfully", role });
  } catch (error) {
    console.error("Error updating role:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteRoleById = async (req, res) => {
  const { roleId } = req.params;

  try {
    await roleService.deleteRoleById(roleId);
    res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    console.error("Error deleting role:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
