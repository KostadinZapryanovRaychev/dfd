const express = require("express");
const router = express.Router();
const ApplicationController = require("../controllers/applicationController");
const { adminAuthorizationMiddleware } = require("../middlewares/adminAuthorization");
const { celebrate, Segments } = require("celebrate");
const applicationValidator = require("../validations/applicationValidator");
const competitionValidator = require("../validations/competitionValidator");

//TODO to check again all validation to bring back this one

router.post(
  "/",
  // celebrate({
  //   [Segments.BODY]: applicationValidator.applyToCompetitionPayloadSchema,
  // }),
  ApplicationController.applyToCompetition
);

router.post("/upload", ApplicationController.uploadSolution);

router.get(
  "/competitions/:competitionId",
  celebrate({
    [Segments.PARAMS]: competitionValidator.getCompetitionByIdPayloadSchema,
  }),
  ApplicationController.getApplicationsForCompetition
);
router.get(
  "/user/:userId/:isPublished",
  celebrate({
    [Segments.PARAMS]: applicationValidator.getCompetitionsForUserPayloadSchema,
  }),
  ApplicationController.getCompetitionsForUser
);
router.delete(
  "/:userId/:competitionId",
  celebrate({
    [Segments.PARAMS]: applicationValidator.deleteApplicationPayloadSchema,
  }),
  ApplicationController.removeApplication
);
router.get("/", ApplicationController.getAllApplications);

router.put(
  "/:applicationId",
  celebrate({
    [Segments.PARAMS]: applicationValidator.getApplicationBydIdPayloadSchema,
  }),
  celebrate({
    [Segments.BODY]: applicationValidator.updateCompetitionGradePayloadSchema,
  }),
  adminAuthorizationMiddleware,
  ApplicationController.updateApplicationGrade
);
router.get(
  "/:applicationId",
  celebrate({
    [Segments.PARAMS]: applicationValidator.getApplicationBydIdPayloadSchema,
  }),
  ApplicationController.getApplicationById
);
router.get("/download/solutions/:fileName", ApplicationController.downloadSolutionFile);

module.exports = router;
