const express = require("express");
const router = express.Router();
const RoleController = require("../controllers/roleController");

router.post("/", RoleController.createRole);
router.get("/", RoleController.getAllRoles);
router.get("/:roleId", RoleController.getRoleById);
router.patch("/:roleId", RoleController.updateRoleById);
router.delete("/:roleId", RoleController.deleteRoleById);

module.exports = router;
