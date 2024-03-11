const { Joi } = require("celebrate");

const createPaymentPayloadSchema = Joi.object().keys({
  name: Joi.string().required(),
  userId: Joi.number().required(),
  amount: Joi.number().required(),
  status: Joi.string().required(),
});

module.exports = {
  createPaymentPayloadSchema,
};
