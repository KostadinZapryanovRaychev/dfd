const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.post("/logout", UserController.logoutUser);
router.post("/update-password/:userId", UserController.updateUserPassword);
router.get("/users", UserController.getAllUsers);
router.get("/users/:userId", UserController.getUser);
router.post("/users/:userId", UserController.updateUserInfo);
router.delete("/users/:userId", UserController.deleteUser);

module.exports = router;
