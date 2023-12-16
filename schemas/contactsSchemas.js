const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  number: Joi.string().required(),
});

module.exports = {
  contactsSchema,
};
