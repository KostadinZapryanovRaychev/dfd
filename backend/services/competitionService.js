const Competition = require("../models/CompetitionModel");
const path = require("path");
const UserCompetition = require("../models/UserCompetitionModel");
require("dotenv").config();
const fs = require("fs");
const errorMessages = require("../constants/errors");

const createCompetition = async (competitionData) => {
  try {
    const competition = await Competition.create(competitionData);
    return competition;
  } catch (error) {
    throw new Error(errorMessages.unsuccessfull);
  }
};

const getAllCompetitions = async () => {
  try {
    const baseUrl = process.env.BASE_URL_LOGO;
    const initialCompetitions = await Competition.findAll();
    const competitions = initialCompetitions.map((competition) => ({
      ...competition.toJSON(),
      logo: competition.logo
        ? `${baseUrl}/${path.basename(competition.logo)}`
        : null,
    }));
    return competitions;
  } catch (error) {
    console.log("Error during getting all competitions", error);
    throw new Error(errorMessages.unsuccessfull);
  }
};

const getCompetitionById = async (competitionId) => {
  try {
    const competition = await Competition.findByPk(competitionId);
    return competition;
  } catch (error) {
    console.log("Error during getting competition", error);
    throw new Error(errorMessages.unsuccessfull);
  }
};

const updateCompetition = async (competitionId, updateData) => {
  try {
    const competition = await Competition.findByPk(competitionId);
    Object.keys(updateData).forEach((key) => {
      competition[key] = updateData[key];
    });
    await competition.save();
    return competition;
  } catch (error) {
    console.log("Error updating competition", error);
    throw new Error(errorMessages.unsuccessfull);
  }
};

const deleteCompetition = async (competitionId) => {
  try {
    const competition = await Competition.findByPk(competitionId);
    if (competition.logo) {
      const previousPhotoPath = path.join(__dirname, "../", competition.logo);
      if (fs.existsSync(previousPhotoPath)) {
        fs.unlinkSync(previousPhotoPath);
      }
    }
    await competition.destroy();
    await deleteCompetitionRecords(competitionId);
  } catch (error) {
    console.log("Error deleting competition", error);
    throw new Error(errorMessages.unsuccessfull);
  }
};

module.exports = {
  createCompetition,
  getAllCompetitions,
  getCompetitionById,
  updateCompetition,
  deleteCompetition,
};

const deleteCompetitionRecords = async (competitionId) => {
  try {
    await UserCompetition.destroy({
      where: {
        competitionId: competitionId,
      },
    });
  } catch (error) {
    console.log(
      `Error deleting UserCompetition records for competition ${competitionId}:`,
      error
    );
    throw new Error(errorMessages.unsuccessfull);
  }
};
