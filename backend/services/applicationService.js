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

const getApplicationsForCompetition = async (competitionId, userId, isAdmin) => {
  if (!competitionId) {
    return res.status(404).json({ message: "No competitionId for the competition" });
  }

  try {
    const applications = await UserCompetition.findAll({
      where: { competitionId },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
        {
          model: Competition,
          attributes: ["id", "name", "status"],
        },
      ],
    });

    if (!applications.length) {
      return res.status(200).json({ applications: [] });
    }

    if (!isAdmin && applications.length >= 1 && applications[0].User.id !== userId) {
      return res.status(403).json({ message: "You do not have permission to access this resource" });
    }

    const formattedApplications = applications.map((application) => ({
      id: application.id,
      grade: application.grade,
      user: {
        id: application.User.id,
        firstName: application.User.firstName,
        lastName: application.User.lastName,
      },
      competition: {
        id: application.Competition.id,
        name: application.Competition.name,
        status: application.Competition.status || "closed",
      },
      solutionUrl: application.solutionUrl,
      appliedAt: application.appliedAt,
    }));

    return formattedApplications;
  } catch (error) {
    console.error("Error fetching applications for competition:", error);
    throw new Error("Internal server error");
  }
};

const getCompetitionsForUser = async (userId, isPublished) => {
  try {
    const applications = await UserCompetition.findAll({
      where: { userId },
      include: [
        {
          model: Competition,
          attributes: ["name", "status"],
          required: true,
        },
      ],
    });

    let formattedApplications;
    if (isPublished) {
      formattedApplications = applications
        .map((application) => ({
          id: application.id,
          grade: application.grade,
          userId: application.userId,
          competitionId: application.competitionId,
          competitionName: application.Competition.name,
          status: application.Competition.status,
          appliedAt: application.appliedAt,
        }))
        .filter((application) => application.status === competitionStatus.published);
    } else {
      formattedApplications = applications.map((application) => ({
        id: application.id,
        grade: application.grade,
        userId: application.userId,
        competitionId: application.competitionId,
        competitionName: application.Competition.name,
        status: application.Competition.status,
        appliedAt: application.appliedAt,
      }));
    }

    return formattedApplications;
  } catch (error) {
    console.error("Error fetching competitions for user:", error);
    throw new Error("Internal server error");
  }
};

module.exports = { applyToCompetition, getApplicationsForCompetition, getCompetitionsForUser };
