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

module.exports = {
  createCompetition,
};
