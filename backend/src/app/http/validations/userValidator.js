const { Joi, errors } = require("celebrate");

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
  firstName: Joi.string().error((errors) => console.log(errors)),
  lastName: Joi.string().error((errors) => console.log(errors)),
  email: Joi.string()
    .email()
    .error((errors) => console.log(errors)),
  isAdmin: Joi.boolean().error((errors) => console.log(errors)),
  isBlocked: Joi.boolean().error((errors) => console.log(errors)),
  address: Joi.string()
    .allow(null)
    .error((errors) => console.log(errors)),
  phone: Joi.string()
    .allow(null)
    .error((errors) => console.log(errors)),
  company: Joi.string()
    .allow(null)
    .error((errors) => console.log(errors)),
  age: Joi.number()
    .integer()
    .allow(null)
    .error((errors) => console.log(errors)),
  profession: Joi.string().error((errors) => console.log(errors)),
  level: Joi.number()
    .integer()
    .allow(null)
    .error((errors) => console.log(errors)),
  photo: Joi.string().error((errors) => console.log(errors)),
});

const getUserBydIdPayloadSchema = Joi.object().keys({
  userId: Joi.string().required(),
});

module.exports = {
  registerPayloadSchema,
  loginPayloadSchema,
  updatePasswordPayloadSchema,
  updateUserInformationPayloadSchema,
  getUserBydIdPayloadSchema,
};
