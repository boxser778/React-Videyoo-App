const Joi = require("Joi");

function useValidation(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255),
    email: Joi.string().min(6).max(255).email(),
    url: Joi.string().min(10).max(1024),
  });

  return schema.validate(user);
}

module.exports = useValidation;
