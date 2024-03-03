const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const {
  adminAuthorizationMiddleware,
} = require("../middlewares/adminAuthorization");
const { authenticateToken } = require("../middlewares/authenticate");
const userValidator = require("../validations/userValidator");
const { celebrate, Segments } = require("celebrate");

router.post(
  "/register",
  celebrate({ [Segments.BODY]: userValidator.registerPayloadSchema }),
  UserController.registerUser
);
router.post(
  "/login",
  celebrate({ [Segments.BODY]: userValidator.loginPayloadSchema }),
  UserController.loginUser
);

// TODO to implement change password for user
router.post("/logout", authenticateToken, UserController.logoutUser);
router.post(
  "/update-password/:userId",
  celebrate({
    [Segments.PARAMS]: userValidator.getUserBydIdPayloadSchema,
    [Segments.BODY]: userValidator.updatePasswordPayloadSchema,
  }),
  authenticateToken,
  UserController.updateUserPassword
);
router.get(
  "/users/:userId",
  celebrate({
    [Segments.PARAMS]: userValidator.getUserBydIdPayloadSchema,
  }),
  authenticateToken,
  UserController.getUser
);

router.post("/users/upload", authenticateToken, UserController.uploadUserImage);
router.put(
  "/users/:userId",
  celebrate({
    [Segments.PARAMS]: userValidator.getUserBydIdPayloadSchema,
    [Segments.BODY]: userValidator.updateUserInformationPayloadSchema,
  }),
  authenticateToken,
  UserController.updateUserInformation
);

router.get(
  "/users",
  authenticateToken,
  adminAuthorizationMiddleware,
  UserController.getAllUsers
);
router.delete(
  "/users/:userId",
  celebrate({
    [Segments.PARAMS]: userValidator.getUserBydIdPayloadSchema,
  }),
  authenticateToken,
  adminAuthorizationMiddleware,
  UserController.deleteUser
);

module.exports = router;
