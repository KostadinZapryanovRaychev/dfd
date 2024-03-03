const express = require("express");
const router = express.Router();
const CompetitionController = require("../controllers/competitionController");
const {
  adminAuthorizationMiddleware,
} = require("../middlewares/adminAuthorization");
const { celebrate, Segments } = require("celebrate");
const competitionValidator = require("../validations/competitionValidator");

router.get("/", CompetitionController.getAllCompetitions);
router.get(
  "/:competitionId",
  celebrate({
    [Segments.PARAMS]: competitionValidator.getCompetitionByIdPayloadSchema,
  }),
  CompetitionController.getCompetitionById
);

router.post(
  "/upload",
  adminAuthorizationMiddleware,
  CompetitionController.uploadImage
);
router.post(
  "/",
  celebrate({
    [Segments.BODY]: competitionValidator.createCompetitionPayloadSchema,
  }),
  adminAuthorizationMiddleware,
  CompetitionController.createCompetition
);
router.put(
  "/:competitionId",
  celebrate({
    [Segments.PARAMS]: competitionValidator.getCompetitionByIdPayloadSchema,
    [Segments.BODY]: competitionValidator.createCompetitionPayloadSchema,
  }),
  adminAuthorizationMiddleware,
  CompetitionController.updateCompetitionById
);

router.delete(
  "/:competitionId",
  celebrate({
    [Segments.PARAMS]: competitionValidator.getCompetitionByIdPayloadSchema,
  }),
  adminAuthorizationMiddleware,
  CompetitionController.deleteCompetitionById
);

module.exports = router;
