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
router.post("/login", UserController.loginUser);
router.post("/logout", authenticateToken, UserController.logoutUser);
router.post(
  "/update-password/:userId",
  authenticateToken,
  UserController.updateUserPassword
);
router.get("/users/:userId", authenticateToken, UserController.getUser);

router.post("/users/upload", authenticateToken, UserController.uploadUserImage);
router.put(
  "/users/:userId",
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
  authenticateToken,
  adminAuthorizationMiddleware,
  UserController.deleteUser
);

module.exports = router;
