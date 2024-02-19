const Competition = require("../models/CompetitionModel");
const multer = require("multer");
const path = require("path");
const UserCompetition = require("../models/UserCompetitionModel");
require("dotenv").config();
const fs = require("fs");

const createCompetition = async (competitionData) => {
  try {
    const competition = await Competition.create(competitionData);
    return competition;
  } catch (error) {
    throw new Error("Error creating competition");
  }
};

const getAllCompetitions = async () => {
  try {
    const baseUrl = process.env.BASE_URL_LOGO;
    const initialCompetitions = await Competition.findAll();
    const competitions = initialCompetitions.map((competition) => ({
      ...competition.toJSON(),
      logo: competition.logo ? `${baseUrl}/${path.basename(competition.logo)}` : null,
    }));
    return competitions;
  } catch (error) {
    throw new Error("Error fetching all competitions");
  }
};

const getCompetitionById = async (competitionId) => {
  if (!competitionId) {
    throw new Error("No competitionId provided");
  }

  try {
    const competition = await Competition.findByPk(competitionId);

    return competition;
  } catch (error) {
    throw new Error("Error fetching competition by ID");
  }
};

const updateCompetition = async (competition, updateData, file) => {
  try {
    if (file && competition.logo) {
      const previousPhotoPath = path.join(__dirname, "../", competition.logo);
      if (fs.existsSync(previousPhotoPath)) {
        fs.unlinkSync(previousPhotoPath);
      }
    }

    Object.keys(updateData).forEach((key) => {
      competition[key] = updateData[key];
    });

    competition.logo = file ? `/public/${file.filename}` : null;

    if (competition.changed()) {
      await competition.save();
    }

    return competition;
  } catch (error) {
    throw new Error("Error updating competition");
  }
};

module.exports = {
  createCompetition,
  getAllCompetitions,
  getCompetitionById,
  updateCompetition,
};
