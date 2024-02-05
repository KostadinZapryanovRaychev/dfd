const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const { adminAuthorizationMiddleware } = require("../middlewares/adminAuthorization");

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.post("/logout", UserController.logoutUser);
router.post("/update-password/:userId", UserController.updateUserPassword);
router.get("/users/:userId", UserController.getUser);
router.post("/users/:userId", UserController.updateUserInfo);

router.get("/users", adminAuthorizationMiddleware, UserController.getAllUsers);
router.delete("/users/:userId", adminAuthorizationMiddleware, UserController.deleteUser);

module.exports = router;
