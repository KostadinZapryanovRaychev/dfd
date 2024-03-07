const multer = require("multer");
const path = require("path");
const fs = require("fs");
const applicationService = require("../services/applicationService");
const errorMessages = require("../constants/errors");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../solutions"));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const uploadSolution = multer({ storage: storage, limits: { fileSize: 50 * 1024 * 1024 } }).single("solution");

exports.applyToCompetition = async (req, res) => {
  try {
    const { userId, competitionId, grade, solutionUrl } = req.body;
    await applicationService.applyToCompetition(userId, competitionId, grade, solutionUrl);
    res.status(201).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Error applying to competition:", error);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};

exports.uploadSolution = async (req, res) => {
  try {
    uploadSolution(req, res, function (err) {
      if (err) {
        console.error("Error during uploading file", err);
        return res.status(400).json({ message: errorMessages.unsuccessfull });
      }
      const file = req.file;
      const solutionUrl = file ? `/solutions/${file.filename}` : null;
      res.status(200).json({ solutionUrl });
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};

exports.getApplicationsForCompetition = async (req, res) => {
  const { competitionId } = req.params;
  const userId = req.user.id;
  const isAdmin = req.user.isAdmin;
  const userLevel = req.user.level;

  try {
    const applications = await applicationService.getApplicationsForCompetition(
      competitionId,
      userId,
      isAdmin,
      userLevel
    );
    res.status(200).json({ applications });
  } catch (error) {
    console.log("Error fetching applications for competition:", error.message);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};

exports.getCompetitionsForUser = async (req, res) => {
  let { userId, isPublished } = req.params;

  try {
    const formattedApplications = await applicationService.getCompetitionsForUser(userId, isPublished);
    res.status(200).json({ formattedApplications });
  } catch (error) {
    console.error("Error fetching competitions for user:", error.message);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};

exports.removeApplication = async (req, res) => {
  const { userId, competitionId } = req.params;

  try {
    await applicationService.removeApplication(userId, competitionId);
    res.status(204).json();
  } catch (error) {
    console.error("Error removing application:", error.message);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};

exports.getAllApplications = async (req, res) => {
  try {
    const applications = await applicationService.getAllApplications();
    res.status(200).json({ applications });
  } catch (error) {
    console.log("Error fetching competitions for user:", error.message);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};

exports.updateApplicationGrade = async (req, res) => {
  const { applicationId } = req.params;
  const { grade } = req.body;

  try {
    await applicationService.updateApplicationGradeById(applicationId, grade);
    res.status(200).json({ message: "Application grade updated successfully" });
  } catch (error) {
    console.error("Error updating application grade:", error);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};

exports.getApplicationById = async (req, res) => {
  const { applicationId } = req.params;

  try {
    const application = await applicationService.getApplicationById(applicationId);
    res.status(200).json({ application });
  } catch (error) {
    console.log("Error fetching application by ID:", error);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};

exports.downloadSolutionFile = async (req, res) => {
  const { fileName } = req.params;
  const filePath = path.join(__dirname, "../solutions", fileName);

  try {
    if (fs.existsSync(filePath)) {
      res.setHeader("Content-Type", "application/octet-stream");
      res.setHeader("Content-Disposition", `attachment: filename=${fileName}`);
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);

      fileStream.on("error", (err) => {
        console.log("Error streaming file:", err);
        res.status(400).json({ message: errorMessages.unsuccessfull });
      });
    } else {
      console.log("File not found");
      res.status(400).json({ message: errorMessages.unsuccessfull });
    }
  } catch (error) {
    console.log("Error accessing file:", error);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};
