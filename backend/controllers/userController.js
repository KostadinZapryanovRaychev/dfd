const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const UserCompetition = require("../models/UserCompetitionModel");

const userService = require("../services/userService");

const storageForUserImages = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../profilepictures"));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const uploadForUserImages = multer({ storage: storageForUserImages }).single("photo");

exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const result = await userService.registerUser(firstName, lastName, email, password);
  if (result.error) {
    return res.status(400).json({ message: result.error });
  }
  res.status(201).json({ message: result.message, token: result.token });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please provide valid credentials" });
  }
  const result = await userService.loginUser(email, password);
  if (result.error) {
    return res.status(400).json({ message: result.error });
  }

  res.status(200).json({ message: result.message, token: result.token });
};

exports.logoutUser = async (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};

exports.updateUserPassword = async (req, res) => {
  const { userId } = req.params;
  const { currentPassword, newPassword } = req.body;
  const result = await userService.updateUserPassword(userId, currentPassword, newPassword);
  if (result.error) {
    return res.status(400).json({ message: result.error });
  }
  res.status(200).json({ message: result.message });
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    res.status(200).json({ users });
  } catch (error) {
    console.error("Error while fetching all users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUser = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(404).json({ message: "No id for user" });
  }

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const baseUrl = process.env.BASE_URL;
    user.photoUrl = user.photoUrl ? `${baseUrl}/${path.basename(user.photoUrl)}` : null;

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error while fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateUserInfo = async (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(404).json({ message: "No id for user" });
  }

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.photoUrl) {
      const previousPhotoPath = path.join(__dirname, "../", user.photoUrl);
      if (user.photoUrl && fs.existsSync(previousPhotoPath)) {
        fs.unlinkSync(previousPhotoPath);
      }
    }

    uploadForUserImages(req, res, async function (err) {
      if (err) {
        console.error("Error uploading user photo", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      const { firstName, lastName, email, isBlocked, isAdmin, address, phone, company, age, profession } = req.body;

      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.isAdmin = isAdmin;
      user.isBlocked = isBlocked;
      user.address = address;
      user.phone = phone;
      user.company = company;
      user.age = age;
      user.profession = profession;

      user.photoUrl = req.file ? `/profilepictures/${req.file.filename}` : null;
      if (user.changed()) {
        await user.save();
      }

      res.status(200).json({ message: "User information updated successfully", user });
    });
  } catch (error) {
    console.error("Error updating user information:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.userId;
  const requestingUserId = req.user.id;
  const isAdmin = req.user.isAdmin;

  if (!userId) {
    return res.status(404).json({ message: "No id for user" });
  }

  if (!requestingUserId) {
    return res.status(404).json({ message: "No requestingUserId for user" });
  }

  if (!isAdmin) {
    return res.status(403).json({ message: "Unauthorized request" });
  }

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const numberedUserId = Number(userId);
    if (numberedUserId === requestingUserId) {
      return res.status(403).json({ message: "Cannot delete your own account" });
    }

    if (user.photoUrl) {
      const previousPhotoPath = path.join(__dirname, "../", user.photoUrl);
      if (user.photoUrl && fs.existsSync(previousPhotoPath)) {
        fs.unlinkSync(previousPhotoPath);
      }
    }

    await user.destroy();

    await deleteUserRecords(userId);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUserRecords = async (userId) => {
  try {
    await UserCompetition.destroy({
      where: {
        userId: userId,
      },
    });
  } catch (error) {
    console.error(`Error deleting UserCompetition records for userId ${userId}:`, error);
  }
};
