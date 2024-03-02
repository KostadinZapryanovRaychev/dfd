const { Joi } = require("celebrate");

const registerPayloadSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
const loginPayloadSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
const updatePasswordPayloadSchema = Joi.object().keys({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
});

const updateUserInformationPayloadSchema = Joi.object().keys({
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().email(),
  isAdmin: Joi.boolean(),
  isBlocked: Joi.boolean(),
  address: Joi.string(),
  phone: Joi.string(),
  company: Joi.string(),
  age: Joi.string(),
  profession: Joi.string(),
  level: Joi.string(),
  photo: Joi.string(),
});

const deleteUserPayloadSchema = Joi.object().keys({
  userId: Joi.string().required(),
});

module.exports = {
  registerPayloadSchema,
  loginPayloadSchema,
  updatePasswordPayloadSchema,
  updateUserInformationPayloadSchema,
  deleteUserPayloadSchema,
};
