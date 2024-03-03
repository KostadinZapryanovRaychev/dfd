const { Joi } = require("celebrate");

const applyToCompetitionPayloadSchema = Joi.object().keys({
  userId: Joi.number().integer().required(),
  competitionId: Joi.number().integer().required(),
  grade: Joi.number().required(),
});

const deleteApplicationPayloadSchema = Joi.object().keys({
  userId: Joi.string().required(),
  competitionId: Joi.string().required(),
});

const getCompetitionsForUserPayloadSchema = Joi.object().keys({
  userId: Joi.string().required(),
  isPublished: Joi.boolean().required(),
});

const getApplicationBydIdPayloadSchema = Joi.object().keys({
  applicationId: Joi.string().required(),
});

const updateCompetitionGradePayloadSchema = Joi.object().keys({
  grade: Joi.number().required(),
});

module.exports = {
  applyToCompetitionPayloadSchema,
  deleteApplicationPayloadSchema,
  getApplicationBydIdPayloadSchema,
  getCompetitionsForUserPayloadSchema,
  updateCompetitionGradePayloadSchema,
};