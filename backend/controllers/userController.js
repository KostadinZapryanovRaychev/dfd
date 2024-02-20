require("dotenv").config();
const multer = require("multer");
const path = require("path");
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
    console.log(error);
  }
};

exports.logoutUser = async (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};

exports.updateUserPassword = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(404).json({ message: "No id for user" });
  }
  const { currentPassword, newPassword } = req.body;
  const result = await userService.updateUserPassword(userId, currentPassword, newPassword);
  if (result.error) {
    return res.status(400).json({ message: result.error });
  }
  res.status(200).json({ message: result.message });
};

exports.getAllUsers = async (req, res) => {
  const result = await userService.getAllUsers();
  if (result.error) {
    return res.status(500).json({ message: result.error });
  }
  res.status(200).json({ users: result.users });
};

exports.getUser = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(404).json({ message: "No id for user" });
  }

  const result = await userService.getUserById(userId);
  if (result.error) {
    return res.status(500).json({ message: result.error });
  }

  const user = result.user;
  res.status(200).json({ user });
};

exports.updateUserInfo = async (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(404).json({ message: "No id for user" });
  }

  try {
    uploadForUserImages(req, res, async function (err) {
      if (err) {
        console.error("Error uploading user photo", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      const { firstName, lastName, email, isBlocked, isAdmin, address, phone, company, age, profession, level } =
        req.body;
      const file = req.file;

      const result = await userService.updateUserInformation(
        userId,
        {
          firstName,
          lastName,
          email,
          isBlocked,
          isAdmin,
          address,
          phone,
          company,
          age,
          profession,
          level,
        },
        file
      );

      if (result.error) {
        return res.status(404).json({ message: result.error });
      }

      res.status(200).json({ message: result.message, user: result.user });
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

  try {
    const result = await userService.deleteUser(userId, requestingUserId, isAdmin);

    if (result.error) {
      return res.status(404).json({ message: result.error });
    }

    res.status(200).json({ message: result.message });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
