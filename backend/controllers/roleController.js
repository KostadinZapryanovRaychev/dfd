const Role = require("../models/RoleModel");

// Create a new role
exports.createRole = async (req, res) => {
  try {
    const role = await Role.create(req.body);
    res.status(201).json({ message: "Role created successfully", role });
  } catch (error) {
    console.error("Error creating role:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json({ roles });
  } catch (error) {
    console.error("Error while fetching all roles:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a role by ID
exports.getRoleById = async (req, res) => {
  const { roleId } = req.params;

  try {
    const role = await Role.findByPk(roleId);

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json({ role });
  } catch (error) {
    console.error("Error while fetching role:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a role by ID
exports.updateRoleById = async (req, res) => {
  const { roleId } = req.params;

  try {
    const role = await Role.findByPk(roleId);

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    // Update role information
    await role.update(req.body);

    res.status(200).json({ message: "Role updated successfully", role });
  } catch (error) {
    console.error("Error updating role:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a role by ID
exports.deleteRoleById = async (req, res) => {
  const { roleId } = req.params;

  try {
    const role = await Role.findByPk(roleId);

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    // Perform any additional checks, e.g., authorization to delete a role

    await role.destroy();

    res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    console.error("Error deleting role:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
