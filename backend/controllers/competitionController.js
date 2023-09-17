const Competition = require("../models/CompetitionModel");

exports.createCompetition = async (req, res) => {
  try {
    const competition = await Competition.create(req.body);
    res.status(201).json({ message: "Competition created successfully", competition });
  } catch (error) {
    console.error("Error creating competition:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllCompetitions = async (req, res) => {
  try {
    const competitions = await Competition.findAll();
    res.status(200).json({ competitions });
  } catch (error) {
    console.error("Error while fetching all competitions:", error);
    res.status(500).json({ message: "Internal server error during fetching all competitions" });
  }
};

exports.getCompetitionById = async (req, res) => {
  const { competitionId } = req.params;

  try {
    const competition = await Competition.findByPk(competitionId);

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

  try {
    const competition = await Competition.findByPk(competitionId);

    if (!competition) {
      return res.status(404).json({ message: "Competition not found" });
    }

    await competition.update(req.body);

    res.status(200).json({ message: "Competition updated successfully", competition });
  } catch (error) {
    console.error("Error updating competition:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteCompetitionById = async (req, res) => {
  const { competitionId } = req.params;

  try {
    const competition = await Competition.findByPk(competitionId);

    if (!competition) {
      return res.status(404).json({ message: "Competition not found" });
    }
    // Perform any additional checks, e.g., authorization to delete a competition

    await competition.destroy();

    res.status(200).json({ message: "Competition deleted successfully" });
  } catch (error) {
    console.error("Error deleting competition:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
