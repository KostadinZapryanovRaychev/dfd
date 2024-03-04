require("dotenv").config();
const multer = require("multer");
const path = require("path");
const userService = require("../services/userService");
const fs = require("fs");
const errorMessages = require("../constants/errors");

const storageForUserImages = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../profilepictures"));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const uploadForUserImages = multer({ storage: storageForUserImages }).single("photo");

exports.uploadUserImage = (req, res) => {
  try {
    uploadForUserImages(req, res, async function (err) {
      if (err) {
        console.error("Error uploading user photo", err);
        return res.status(400).json({ message: errorMessages.unsuccessfull });
      }
      const photo = req.file ? `/profilepictures/${req.file.filename}` : null;
      res.status(200).json({ photo });
    });
  } catch (e) {
    console.log("Error uploading image:", error);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};

exports.updateUserInformation = async (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(404).json({ message: "No id for user" });
  }

  try {
    const user = await userService.getUserById(userId);
    if (user.user && user.currentUrl) {
      const previousPhotoPath = path.join(__dirname, "../", user.currentUrl);
      if (fs.existsSync(previousPhotoPath)) {
        fs.unlinkSync(previousPhotoPath);
      }
    }

    const result = await userService.updateUserInformation(userId, req.body);

    if (result.error) {
      return res.status(404).json({ message: result.error });
    }

    res.status(200).json({ message: result.message, user: result.user });
  } catch (error) {
    console.log("Error updating user information:", error);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};

exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const result = await userService.registerUser(firstName, lastName, email, password);
  if (result.error) {
    return res.status(400).json({ message: errorMessages.unsuccessfull });
  }
  res.status(201).json({ message: result.message, token: result.token });
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide valid credentials" });
    }
    const result = await userService.loginUser(email, password);
    if (result.error) {
      return res.status(400).json({ message: result.error });
    }

    res.status(200).json({ message: result.message, token: result.token });
  } catch (error) {
    console.log("Error during login user", error);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    res.status(204);
  } catch (error) {
    console.log("Error during logout", error);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};

exports.updateUserPassword = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(404).json({ message: "No id for user" });
  }
  try {
    const { currentPassword, newPassword } = req.body;
    const result = await userService.updateUserPassword(userId, currentPassword, newPassword);
    if (result.error) {
      return res.status(400).json({ message: result.error });
    }
    res.status(200).json({ message: result.message });
  } catch (error) {
    console.log("Error during update password", error);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const result = await userService.getAllUsers();
    if (result.error) {
      return res.status(400).json({ message: errorMessages.unsuccessfull });
    }
    res.status(200).json({ users: result.users });
  } catch (error) {
    console.log("Error during fetching all users", error);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};

exports.getUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await userService.getUserById(userId);
    if (result.error) {
      res.status(400).json({ message: errorMessages.unsuccessfull });
    }
    const user = result.user;
    res.status(200).json({ user });
  } catch (error) {
    console.log("Error during getting the user", error);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.userId;
  const requestingUserId = req.user.id;
  const isAdmin = req.user.isAdmin;

  try {
    const result = await userService.deleteUser(userId, requestingUserId, isAdmin);

    if (result.error) {
      return res.status(404).json({ message: result.error });
    }

    res.status(204);
  } catch (error) {
    console.log("Error deleting user:", error);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};
