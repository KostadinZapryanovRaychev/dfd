const express = require("express");
const router = express.Router();
const CompetitionController = require("../controllers/competitionController");
const { adminAuthorizationMiddleware } = require("../middlewares/adminAuthorization");

router.get("/", CompetitionController.getAllCompetitions);
router.get("/:competitionId", CompetitionController.getCompetitionById);
router.post("/upload", adminAuthorizationMiddleware, CompetitionController.uploadImage);
router.post("/", adminAuthorizationMiddleware, CompetitionController.createCompetition);

router.post("/:competitionId", adminAuthorizationMiddleware, CompetitionController.updateCompetitionById);
router.delete("/:competitionId", adminAuthorizationMiddleware, CompetitionController.deleteCompetitionById);

module.exports = router;
