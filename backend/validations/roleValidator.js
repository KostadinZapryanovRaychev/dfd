const { Joi } = require("celebrate");

const createRolePayloadSchema = Joi.object().keys({
  name: Joi.string().required(),
});

const getRoleByIdPayloadSchema = Joi.object().keys({
  roleId: Joi.number().integer().required(),
});

module.exports = {
  createRolePayloadSchema,
  getRoleByIdPayloadSchema,
};
