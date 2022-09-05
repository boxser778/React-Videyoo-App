const Joi = require("joi");

function validateVideo(video) {
  const schema = Joi.object({
    title: Joi.string().min(2).max(256).required(),
    description: Joi.string().min(2).max(1024).required(),
    category: Joi.number().required(),
    privacy:Joi.number().required()
  });
  return schema.validate(video);
}
exports.validateVideo = validateVideo;
