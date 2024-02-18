const UserCompetition = require("../models/UserCompetitionModel");
const multer = require("multer");
const path = require("path");
const Competition = require("../models/CompetitionModel");
const User = require("../models/UserModel");
const fs = require("fs");
const competitionStatus = require("../constants/constants");

const applyToCompetition = async (userId, competitionId, grade, file, req, res) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isBlocked) {
      return res.status(400).json({ message: "User can't apply because it is blocked" });
    }

    const existingApplication = await UserCompetition.findOne({ where: { userId, competitionId } });
    if (existingApplication) {
      return res.status(400).json({ message: "User already applied to this competition" });
    }

    const application = await UserCompetition.create({
      userId,
      competitionId,
      grade,
      solutionUrl: file ? `/solutions/${file.filename}` : null,
      appliedAt: new Date(),
    });

    res.status(201).json({ message: "Application created successfully", application });
  } catch (error) {
    console.error("Error creating application:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { applyToCompetition };
