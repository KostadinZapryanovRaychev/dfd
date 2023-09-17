const express = require("express");
const router = express.Router();
const CompetitionController = require("../controllers/competitionController");

router.post("/", CompetitionController.createCompetition);
router.get("/", CompetitionController.getAllCompetitions);
router.get("/:competitionId", CompetitionController.getCompetitionById);
router.patch("/:competitionId", CompetitionController.updateCompetitionById);
router.delete("/:competitionId", CompetitionController.deleteCompetitionById);

module.exports = router;
