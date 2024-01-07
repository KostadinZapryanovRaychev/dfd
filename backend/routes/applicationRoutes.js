const express = require("express");
const router = express.Router();
const ApplicationController = require("../controllers/applicationController");

router.post("/", ApplicationController.applyToCompetition);
router.get("/:userId", ApplicationController.getCompetitionsForUser);
router.delete(
  "/:userId/:competitionId",
  ApplicationController.removeApplication
);
router.get("/", ApplicationController.getAllApplications);
router.put("/", ApplicationController.updateApplication);

module.exports = router;
