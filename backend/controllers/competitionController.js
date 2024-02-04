const Competition = require("../models/CompetitionModel");
const multer = require("multer");
const path = require("path");
const UserCompetition = require("../models/UserCompetitionModel");

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
        console.error(err);
        return res.status(500).send("Error uploading file");
      }

      const { name, description, startsAt, endsAt, award, rating, requirements, status } = req.body;
      const logo = req.file ? `/public/${req.file.filename}` : null;

      const competition = await Competition.create({
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
    const competitions = await Competition.findAll();
    res.status(200).json({ competitions });
  } catch (error) {
    console.error("Error while fetching all competitions:", error);
    res.status(500).json({
      message: "Internal server error during fetching all competitions",
    });
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

    await deleteCompetitionRecords(competitionId);

    res.status(200).json({ message: "Competition deleted successfully" });
  } catch (error) {
    console.error("Error deleting competition:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteCompetitionRecords = async (competitionId) => {
  try {
    await UserCompetition.destroy({
      where: {
        competitionId: competitionId,
      },
    });
  } catch (error) {
    console.error(`Error deleting UserCompetition records for competition ${competitionId}:`, error);
  }
};
