const { Joi } = require("celebrate");

const createCompetitionPayloadSchema = Joi.object().keys({
  name: Joi.string().required(),
  logo: Joi.string().allow(null),
  description: Joi.string().allow(null),
  startsAt: Joi.date().allow(null),
  endsAt: Joi.date().allow(null),
  award: Joi.string().allow(null),
  rating: Joi.number().integer().allow(null),
  requirements: Joi.string().allow(null),
  status: Joi.string().allow(null),
  requestedBy: Joi.string().allow(null),
});

const getCompetitionByIdPayloadSchema = Joi.object().keys({
  competitionId: Joi.string().required(),
});

module.exports = {
  createCompetitionPayloadSchema,
  getCompetitionByIdPayloadSchema,
};
