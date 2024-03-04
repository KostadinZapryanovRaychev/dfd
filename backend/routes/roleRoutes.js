const express = require("express");
const router = express.Router();
const RoleController = require("../controllers/roleController");
const roleValidator = require("../validations/roleValidator");
const { adminAuthorizationMiddleware } = require("../middlewares/adminAuthorization");
const { celebrate, Segments } = require("celebrate");

router.post(
  "/",
  celebrate({ [Segments.BODY]: roleValidator.createRolePayloadSchema }),
  adminAuthorizationMiddleware,
  RoleController.createRole
);
router.get("/", adminAuthorizationMiddleware, RoleController.getAllRoles);
router.get(
  "/:roleId",
  celebrate({ [Segments.PARAMS]: roleValidator.getRoleByIdPayloadSchema }),
  adminAuthorizationMiddleware,
  RoleController.getRoleById
);
router.patch(
  "/:roleId",
  celebrate({ [Segments.PARAMS]: roleValidator.getRoleByIdPayloadSchema }),
  adminAuthorizationMiddleware,
  RoleController.updateRoleById
);
router.delete(
  "/:roleId",
  celebrate({ [Segments.PARAMS]: roleValidator.getRoleByIdPayloadSchema }),
  adminAuthorizationMiddleware,
  RoleController.deleteRoleById
);

module.exports = router;
