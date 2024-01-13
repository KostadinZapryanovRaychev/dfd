const express = require("express");
const router = express.Router();
const ApplicationController = require("../controllers/applicationController");

router.post("/", ApplicationController.applyToCompetition);
router.get("/competitions/:competitionId", ApplicationController.getApplicationsForCompetition);
router.get("/user/:userId", ApplicationController.getCompetitionsForUser);
router.delete("/:userId/:competitionId", ApplicationController.removeApplication);
router.get("/", ApplicationController.getAllApplications);
router.put("/", ApplicationController.updateApplication);
router.get("/:applicationId", ApplicationController.getApplicationById);

module.exports = router;
