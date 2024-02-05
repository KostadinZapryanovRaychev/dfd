const express = require("express");
const router = express.Router();
const RoleController = require("../controllers/roleController");
const { adminAuthorizationMiddleware } = require("../middlewares/adminAuthorization");

router.post("/", adminAuthorizationMiddleware, RoleController.createRole);
router.get("/", adminAuthorizationMiddleware, RoleController.getAllRoles);
router.get("/:roleId", adminAuthorizationMiddleware, RoleController.getRoleById);
router.patch("/:roleId", adminAuthorizationMiddleware, RoleController.updateRoleById);
router.delete("/:roleId", adminAuthorizationMiddleware, RoleController.deleteRoleById);

module.exports = router;
