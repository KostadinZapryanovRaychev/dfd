const UserCompetition = require("../models/UserCompetitionModel");
const multer = require("multer");
const path = require("path");
const Competition = require("../models/CompetitionModel");
const User = require("../models/UserModel");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../solutions"));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).single("solution");

exports.applyToCompetition = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        console.error(err);
        return res.status(500).send("Error uploading file");
      }

      const { userId, competitionId, grade } = req.body;
      const solutionUrl = req.file ? `/solutions/${req.file.filename}` : null;
      const existingApplication = await UserCompetition.findOne({
        where: { userId, competitionId },
      });

      if (existingApplication) {
        return res.status(400).json({ message: "User already applied to this competition" });
      }

      const application = await UserCompetition.create({
        userId,
        competitionId,
        grade,
        solutionUrl,
        appliedAt: new Date(),
      });

      res.status(201).json({ message: "Application created successfully", application });
    });
  } catch (error) {
    console.error("Error applying to competition:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getApplicationsForCompetition = async (req, res) => {
  const { competitionId } = req.params;
  try {
    const applications = await UserCompetition.findAll({
      where: { competitionId },
      include: [
        {
          model: User,
          attributes: ["firstName", "lastName"],
        },
        {
          model: Competition,
          attributes: ["name"],
        },
      ],
    });

    const formattedApplications = applications.map((application) => {
      return {
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
        },
        solutionUrl: application.solutionUrl,
        appliedAt: application.appliedAt,
      };
    });
    res.status(200).json({ applications: formattedApplications });
  } catch (error) {
    console.error("Error fetching applications for competition:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all competitions applied by a user
exports.getCompetitionsForUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const applications = await UserCompetition.findAll({
      where: { userId },
    });

    res.status(200).json({ applications });
  } catch (error) {
    console.error("Error fetching competitions for user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.removeApplication = async (req, res) => {
  const { userId, competitionId } = req.params;

  try {
    const existingApplication = await UserCompetition.findOne({
      where: { userId, competitionId },
    });

    if (!existingApplication) {
      return res.status(404).json({ message: "User has not applied to this competition" });
    }

    await existingApplication.destroy();

    res.status(200).json({ message: "Application removed successfully" });
  } catch (error) {
    console.error("Error removing application:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllApplications = async (req, res) => {
  try {
    const applications = await UserCompetition.findAll();

    res.status(200).json({ applications });
  } catch (error) {
    console.error("Error fetching competitions for user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateApplication = async (req, res) => {
  const { userId, competitionId, grade } = req.body;

  try {
    const application = await UserCompetition.findOne({
      where: { userId, competitionId },
    });

    if (!application) {
      return res.status(404).json({ message: "User has not applied to this competition" });
    }

    await application.update({ grade });

    res.status(200).json({ message: "Application grade updated successfully", application });
  } catch (error) {
    console.error("Error updating application grade:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateApplicationGrade = async (req, res) => {
  const { applicationId } = req.params;
  const { grade } = req.body;

  try {
    const application = await UserCompetition.findByPk(applicationId);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    await application.update({ grade });

    res.status(200).json({ message: "Application grade updated successfully", application });
  } catch (error) {
    console.error("Error updating application grade:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getApplicationById = async (req, res) => {
  const { applicationId } = req.params;

  try {
    const application = await UserCompetition.findByPk(applicationId);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ application: formattedApplication });
  } catch (error) {
    console.error("Error fetching application by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};