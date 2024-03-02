const express = require("express");
const router = express.Router();
const ApplicationController = require("../controllers/applicationController");
const {
  adminAuthorizationMiddleware,
} = require("../middlewares/adminAuthorization");
const { celebrate, Segments } = require("celebrate");

router.post("/", ApplicationController.applyToCompetition);
router.get(
  "/competitions/:competitionId",
  ApplicationController.getApplicationsForCompetition
);
router.get(
  "/user/:userId/:isPublished",
  ApplicationController.getCompetitionsForUser
);
router.delete(
  "/:userId/:competitionId",
  ApplicationController.removeApplication
);
router.get("/", ApplicationController.getAllApplications);
router.put(
  "/",
  adminAuthorizationMiddleware,
  ApplicationController.updateApplication
);
router.put(
  "/:applicationId",
  adminAuthorizationMiddleware,
  ApplicationController.updateApplicationGrade
);
router.get("/:applicationId", ApplicationController.getApplicationById);
router.get(
  "/download/solutions/:fileName",
  adminAuthorizationMiddleware,
  ApplicationController.downloadSolutionFile
);

module.exports = router;
