const Joi = require("joi");

const usersSchemas = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const loginSchemas = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = { usersSchemas, loginSchemas };
