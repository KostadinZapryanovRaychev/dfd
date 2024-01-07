const express = require("express");
const router = express.Router();
const ApplicationController = require("../controllers/applicationController");

router.post("/", ApplicationController.applyToCompetition);
router.get("/:userId", ApplicationController.getCompetitionsForUser);
router.delete(
  "/:userId/:competitionId",
  ApplicationController.removeApplication
);
// router.get(
//   "/:competitionId/applications",
//   ApplicationController.getApplicationsForCompetition
// );
// router.get(
//   "/user/:userId/applications",
//   ApplicationController.getCompetitionsForUser
// );

// router.delete("/", ApplicationController.removeApplication);

module.exports = router;
