const Competition = require("../models/CompetitionModel");
const multer = require("multer");
const path = require("path");
const UserCompetition = require("../models/UserCompetitionModel");
require("dotenv").config();
const fs = require("fs");
const competitionService = require("../services/competitionService");

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
    upload(req, res, async function (err) {
      if (err) {
        console.error("Error during uploading file", err);
        return res.status(500).send("Internal server error");
      }

      const { name, description, startsAt, endsAt, award, rating, requirements, status } = req.body;
      const logo = req.file ? `/public/${req.file.filename}` : null;

      const competition = await competitionService.createCompetition({
        name,
        logo,
        description,
        startsAt,
        endsAt,
        award,
        rating,
        requirements,
        status,
      });

      res.status(201).json({ message: "Competition created successfully", competition });
    });
  } catch (error) {
    console.error("Error creating competition:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllCompetitions = async (req, res) => {
  try {
    const competitions = await competitionService.getAllCompetitions();
    res.status(200).json({ competitions });
  } catch (error) {
    console.error("Internal server error during fetching all competitions", error);
    res.status(500).json({ message: "Internal server error" });
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
    console.error("Error while fetching competition:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateCompetitionById = async (req, res) => {
  const { competitionId } = req.params;

  if (!competitionId) {
    return res.status(404).json({ message: "No competitionId for the competition" });
  }

  try {
    const competition = await competitionService.getCompetitionById(competitionId);

    if (!competition) {
      return res.status(404).json({ message: "Competition not found" });
    }

    upload(req, res, async function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error uploading competition logo" });
      }

      try {
        const updatedCompetition = await competitionService.updateCompetition(competition, req.body, req.file);
        res.status(200).json({ message: "Competition updated successfully", competition: updatedCompetition });
      } catch (error) {
        console.error("Error updating competition:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });
  } catch (error) {
    console.error("Error fetching competition:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteCompetitionById = async (req, res) => {
  const { competitionId } = req.params;
  const isAdmin = req.user.isAdmin;

  if (!isAdmin) {
    return res.status(403).json({ message: "Unauthorized request" });
  }

  try {
    const result = await competitionService.deleteCompetition(competitionId);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error deleting competition:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
