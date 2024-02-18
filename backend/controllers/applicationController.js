const UserCompetition = require("../models/UserCompetitionModel");
const multer = require("multer");
const path = require("path");
const Competition = require("../models/CompetitionModel");
const User = require("../models/UserModel");
const fs = require("fs");
const competitionStatus = require("../constants/constants");
const applicationService = require("../services/applicationService");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../solutions"));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const uploadSolution = multer({ storage: storage }).single("solution");

exports.applyToCompetition = async (req, res) => {
  try {
    uploadSolution(req, res, async function (err) {
      if (err) {
        console.error("Error uploading file:", err);
        return res.status(500).json({ message: "Error uploading file" });
      }

      const { userId, competitionId, grade } = req.body;

      applicationService.applyToCompetition(userId, competitionId, grade, req.file, req, res);
    });
  } catch (error) {
    console.error("Error applying to competition:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getApplicationsForCompetition = async (req, res) => {
  const { competitionId } = req.params;
  const userId = req.user.id;
  const isAdmin = req.user.isAdmin;

  try {
    const applications = await applicationService.getApplicationsForCompetition(competitionId, userId, isAdmin);
    res.status(200).json({ applications });
  } catch (error) {
    console.error("Error fetching applications for competition:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getCompetitionsForUser = async (req, res) => {
  let { userId, isPublished } = req.params;

  if (typeof isPublished === "string" && isPublished === "false") {
    isPublished = false;
  } else if (typeof isPublished === "string" && isPublished === "true") {
    isPublished = true;
  } else {
    isPublished = null;
  }

  try {
    const formattedApplications = await applicationService.getCompetitionsForUser(userId, isPublished);
    res.status(200).json({ formattedApplications });
  } catch (error) {
    console.error("Error fetching competitions for user:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.removeApplication = async (req, res) => {
  const { userId, competitionId } = req.params;

  if (!userId) {
    return res.status(404).json({ message: "No Id of the User" });
  }

  if (!competitionId) {
    return res.status(404).json({ message: "No competitionId of the Competition" });
  }

  try {
    const existingApplication = await UserCompetition.findOne({
      where: { userId, competitionId },
    });

    if (!existingApplication) {
      return res.status(200).json({ message: "User has not applied to this competition" });
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

  if (!userId) {
    return res.status(404).json({ message: "No Id of the User" });
  }

  if (!competitionId) {
    return res.status(404).json({ message: "No competitionId of the Competition" });
  }

  try {
    const application = await UserCompetition.findOne({
      where: { userId, competitionId },
    });

    if (!application) {
      return res.status(404).json({ message: "No application with this userId and competitionId" });
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

  if (!applicationId) {
    return res.status(404).json({ message: "No ApplicationId provided" });
  }

  if (!grade) {
    return res.status(404).json({ message: "No grade provided" });
  }

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

  if (!applicationId) {
    return res.status(404).json({ message: "No ApplicationId provided" });
  }

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

exports.downloadSolutionFile = async (req, res) => {
  const { fileName } = req.params;
  const filePath = path.join(__dirname, "../solutions", fileName);

  try {
    if (fs.existsSync(filePath)) {
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);

      fileStream.on("error", (err) => {
        console.error("Error streaming file:", err);
        res.status(500).json({ message: "Internal server error during file streaming" });
      });
    } else {
      console.error("File not found");
      res.status(404).json({ message: "File not found" });
    }
  } catch (error) {
    console.error("Error accessing file:", error);
    res.status(500).json({ message: "Internal server error during download" });
  }
};
