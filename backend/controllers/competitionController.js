const multer = require("multer");
const path = require("path");
require("dotenv").config();
const competitionService = require("../services/competitionService");
const fs = require("fs");
const errorMessages = require("../constants/errors");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public"));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).single("logo");

exports.createCompetition = async (req, res) => {
  try {
    const { name, description, startsAt, endsAt, award, rating, requirements, status, logo } = req.body;

    const competition = await competitionService.createCompetition({
      name,
      description,
      startsAt,
      endsAt,
      award,
      rating,
      requirements,
      status,
      logo,
    });

    res.status(201).json({ message: "Competition created successfully", competition });
  } catch (error) {
    console.log("Error creating competition:", error);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    upload(req, res, function (err) {
      if (err) {
        console.error("Error during uploading file", err);
        return res.status(500).send("Internal server error");
      }

      const logo = req.file ? `/public/${req.file.filename}` : null;
      res.status(200).json({ logo });
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};

exports.getAllCompetitions = async (req, res) => {
  try {
    const competitions = await competitionService.getAllCompetitions();
    res.status(200).json({ competitions });
  } catch (error) {
    console.error("Internal server error during fetching all competitions", error);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};

exports.getCompetitionById = async (req, res) => {
  const { competitionId } = req.params;

  try {
    const competition = await competitionService.getCompetitionById(competitionId);
    if (!competition) {
      return res.status(404).json({ message: "Competition not found" });
    }

    res.status(200).json({ competition });
  } catch (error) {
    console.log("Error while fetching competition:", error);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};

exports.updateCompetitionById = async (req, res) => {
  const { competitionId } = req.params;

  try {
    const competition = await competitionService.getCompetitionById(competitionId);

    if (!competition) {
      return res.status(404).json({ message: "Competition not found" });
    }
    if (competition.logo) {
      const previousPhotoPath = path.join(__dirname, "../", competition.logo);
      if (fs.existsSync(previousPhotoPath)) {
        fs.unlinkSync(previousPhotoPath);
      }
    }
    const updatedCompetition = await competitionService.updateCompetition(competitionId, req.body);
    res.status(200).json({ message: "Competition updated successfully", competition: updatedCompetition });
  } catch (error) {
    console.log("Error updating competition:", error);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};

exports.deleteCompetitionById = async (req, res) => {
  const { competitionId } = req.params;
  const isAdmin = req.user.isAdmin;

  if (!isAdmin) {
    return res.status(403).json({ message: errorMessages.unauthorized });
  }

  try {
    const result = await competitionService.deleteCompetition(competitionId);
    res.status(200).json(result);
  } catch (error) {
    console.log("Error deleting competition:", error.message);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};
