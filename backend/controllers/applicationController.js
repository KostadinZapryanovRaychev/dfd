const UserCompetition = require("../models/UserCompetitionModel");
const multer = require("multer");
const path = require("path");
const Competition = require("../models/CompetitionModel");
const User = require("../models/UserModel");
const fs = require("fs");
const competitionStatus = require("../constants/constants");

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

      const user = await User.findByPk(userId);

      const isUserBlocked = user?.isBlocked;

      if (isUserBlocked) {
        return res.status(400).json({ message: "User can't apply because it is blocked" });
      }
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

      return res.status(201).json({ message: "Application created successfully", application });
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
          attributes: ["id", "firstName", "lastName"],
        },
        {
          model: Competition,
          attributes: ["id", "name", "status"],
        },
      ],
    });

    // TODO check if current user and User.id are the same if the role of current user is not admin to stop here

    if (!applications.length) {
      return res.status(200).json({ applications: [] });
    }

    const formattedApplications = applications
      .map((application) => {
        if (!application.User || !application.Competition) {
          console.log("There are no longer such users or competitions");
          return {};
        }
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
            staus: application.Competition.status || "closed",
          },
          solutionUrl: application.solutionUrl,
          appliedAt: application.appliedAt,
        };
      })
      .filter((entry) => Object.keys(entry).length !== 0);

    console.log(formattedApplications);

    if (formattedApplications.length === 0) {
      return res.status(404).json({ message: "No competition found" });
    }
    res.status(200).json({ applications: formattedApplications });
  } catch (error) {
    console.error("Error fetching applications for competition:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getCompetitionsForUser = async (req, res) => {
  let { userId, isPublished } = req.params;
  const requestingUserId = req.user.id;

  if (typeof isPublished === "string" && isPublished === "false") {
    isPublished = false;
  } else if (typeof isPublished === "string" && isPublished === "true") {
    isPublished = true;
  } else {
    isPublished = null;
  }

  if (!userId) {
    return res.status(200).json({ formattedApplications: [] });
  }

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
    if (!formattedApplications.length) {
      return res.status(200).json({ formattedApplications });
    }
    return res.status(200).json({ formattedApplications });
  } catch (error) {
    console.error("Error fetching competitions for user:", error);
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
