const { Joi } = require("celebrate");

const createSubscriptionPayloadSchema = Joi.object().keys({
  name: Joi.string().required(),
  amount: Joi.number().integer().required(),
});

const getSubscriptionByIdPayloadSchema = Joi.object().keys({
  subscriptionId: Joi.number().integer().required(),
});

module.exports = {
  createSubscriptionPayloadSchema,
  getSubscriptionByIdPayloadSchema,
};
