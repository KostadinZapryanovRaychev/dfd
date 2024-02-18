const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const UserCompetition = require("../models/UserCompetitionModel");

const registerUser = async (firstName, lastName, email, password) => {
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return { error: "User with this email already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, secretKey, {
      expiresIn: "1h", // Set the token expiration time as per your requirement
    });

    return { message: "User registered successfully", token };
  } catch (error) {
    console.error("Error during user registration:", error);
    return { error: "Internal server error" };
  }
};

const loginUser = async (email, password) => {
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      return { error: "User with this email does not exist" };
    }
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return { error: "Invalid password" };
    }

    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(
      { id: existingUser.id, email: existingUser.email, isAdmin: existingUser.isAdmin },
      secretKey,
      {
        expiresIn: "1h",
      }
    );

    return { message: "Login successful", token };
  } catch (error) {
    console.error("Error during user login:", error);
    return { error: "Internal server error" };
  }
};

const updateUserPassword = async (userId, currentPassword, newPassword) => {
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return { error: "User not found" };
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return { error: "Invalid current password" };
    }

    if (currentPassword === newPassword) {
      return { error: "The password is the same as before" };
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await user.update({ password: hashedNewPassword });

    return { message: "Password updated successfully" };
  } catch (error) {
    console.error("Error updating user password:", error);
    return { error: "Internal server error" };
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    return { users };
  } catch (error) {
    console.error("Error while fetching all users:", error);
    return { error: "Internal server error" };
  }
};

const getUserById = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return { error: "User not found" };
    }

    const baseUrl = process.env.BASE_URL;
    user.photoUrl = user.photoUrl ? `${baseUrl}/${path.basename(user.photoUrl)}` : null;

    return { user };
  } catch (error) {
    console.error("Error while fetching user:", error);
    return { error: "Internal server error" };
  }
};

const updateUserPhoto = async (user, file) => {
  try {
    if (user.photoUrl) {
      const previousPhotoPath = path.join(__dirname, "../", user.photoUrl);
      if (user.photoUrl && fs.existsSync(previousPhotoPath)) {
        fs.unlinkSync(previousPhotoPath);
      }
    }

    user.photoUrl = file ? `/profilepictures/${file.filename}` : null;
    if (user.changed()) {
      await user.save();
    }
  } catch (error) {
    console.error("Error updating user photo:", error);
    throw new Error("Error updating user photo");
  }
};

const updateUserInformation = async (userId, userData, file) => {
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return { error: "User not found" };
    }

    const { firstName, lastName, email, isBlocked, isAdmin, address, phone, company, age, profession } = userData;

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

    await updateUserPhoto(user, file);

    return { message: "User information updated successfully", user };
  } catch (error) {
    console.error("Error updating user information:", error);
    return { error: "Internal server error" };
  }
};

module.exports = { registerUser, loginUser, updateUserPassword, getAllUsers, getUserById, updateUserInformation };