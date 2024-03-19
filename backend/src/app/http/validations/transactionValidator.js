const { Joi } = require("celebrate");

const createTransactionPayloadSchema = Joi.object().keys({
  name: Joi.string(),
});

const getTransactionByIdPayloadSchema = Joi.object().keys({
  transactionId: Joi.number().integer().required(),
});

module.exports = {
  createTransactionPayloadSchema,
  getTransactionByIdPayloadSchema,
};
