const bcrypt = require("bcrypt");
const User = require("../../database/models/UserModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const path = require("path");
const fs = require("fs");
const UserCompetition = require("../../database/models/UserCompetitionModel");
const errorMessages = require("../../../../constants/errors");
const constants = require("../../../../constants/constants");

const registerUser = async (firstName, lastName, email, password) => {
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("User with this email already exists");
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
    console.log("Error during user registration:", error);
    throw new Error(errorMessages.unsuccessfull);
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
      throw new Error("Invalid password");
    }

    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
        level: existingUser.level,
      },
      secretKey,
      {
        expiresIn: "1h",
      }
    );
    const now = new Date();
    const userExpDate = existingUser?.subscriptionExpDate;

    if (userExpDate && userExpDate < now) {
      await existingUser.update({ level: 0 });
    }

    return { message: "Login successful", token };
  } catch (error) {
    console.log("Error during user login:", error);
    throw new Error(errorMessages.unsuccessfull);
  }
};

const updateUserPassword = async (userId, currentPassword, newPassword) => {
  try {
    const user = await User.findByPk(userId);
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
    console.log("Error updating user password:", error);
    throw new Error(errorMessages.unsuccessfull);
  }
};

const updateUserSubscriptionExpDateAndLevel = async (userId, subscriptionExpDate, subscriptionLevel) => {
  let newUserLevel = 0;

  if (subscriptionLevel === constants.subscriptionLevel.gold) {
    newUserLevel = 2;
  } else if (subscriptionLevel === constants.subscriptionLevel.silver) {
    newUserLevel = 1;
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return { error: "User with this id does not exist" };
    }
    await user.update({ subscriptionExpDate: subscriptionExpDate, level: newUserLevel });
    return { message: "Experation date updated successeffully" };
  } catch (error) {
    console.log("Error updating user password:", error);
    throw new Error(errorMessages.unsuccessfull);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.findAll({
      order: [["subscriptionExpDate", "ASC"]],
    });
    return { users };
  } catch (error) {
    console.log("Error while fetching all users:", error);
    throw new Error(errorMessages.unsuccessfull);
  }
};

const getUserById = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    const baseUrl = process.env.BASE_URL_PROFILEPICTURE;
    const currentUrl = user.photoUrl;
    user.photoUrl = user.photoUrl ? `${baseUrl}/${path.basename(user.photoUrl)}` : null;
    return { user, currentUrl };
  } catch (error) {
    console.error("Error while fetching user:", error);
    throw new Error(errorMessages.unsuccessfull);
  }
};

const updateUserInformation = async (userId, userData) => {
  try {
    const user = await User.findByPk(userId);
    const { firstName, lastName, email, isBlocked, isAdmin, address, phone, company, age, profession, level, photo } =
      userData;

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
    user.level = level;
    user.photoUrl = photo;

    await user.save();
    return { message: "User information updated successfully", user };
  } catch (error) {
    console.error("Error updating user information:", error);
    throw new Error(errorMessages.unsuccessfull);
  }
};

const deleteUser = async (userId, requestingUserId, isAdmin) => {
  try {
    if (!isAdmin) {
      throw new Error(errorMessages.unauthorized);
    }
    const user = await User.findByPk(userId);
    const numberedUserId = Number(userId);
    if (numberedUserId === requestingUserId) {
      return { error: "Cannot delete your own account" };
    }

    if (user.photoUrl) {
      const previousPhotoPath = path.join(__dirname, "../../../../", user.photoUrl);
      if (user.photoUrl && fs.existsSync(previousPhotoPath)) {
        fs.unlinkSync(previousPhotoPath);
      }
    }
    await user.destroy();
    await deleteUserRecords(userId);
    return { message: "User deleted successfully" };
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error(errorMessages.unsuccessfull);
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUserPassword,
  getAllUsers,
  getUserById,
  updateUserInformation,
  updateUserSubscriptionExpDateAndLevel,
  deleteUser,
};

// TODO delete routes to be fixed , and get routes eventyally
const deleteUserRecords = async (userId) => {
  try {
    await UserCompetition.destroy({
      where: {
        userId: userId,
      },
    });
  } catch (error) {
    console.error(`Error deleting UserCompetition records for userId ${userId}:`, error);
    throw new Error(errorMessages.unsuccessfull);
  }
};
