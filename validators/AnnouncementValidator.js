const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class AnnouncementValidator extends BaseValidator {
 
  validateCreateAnnouncement = (announcement) => {
    const schema = Joi.object().keys({
      name: Joi.string().optional().label("Announcement Title"),
      description: Joi.string().optional().label("Description"),
      date: Joi.date().required().label("Date"),
      type: Joi.string().optional().label("Type"),
      isDeleted: Joi.boolean().optional(),
    });

    return this.validate(schema, announcement);
  };

  validateUpdateAnnouncement = (announcement) => {
    const schema = Joi.object().keys({
      name: Joi.string().optional().label("Announcement Title"),
      description: Joi.string().optional().label("Description"),
      date: Joi.date().optional().label("Date"),
      type: Joi.string().optional().label("Type"),
      isDeleted: Joi.boolean().optional(),
    });

    return this.validate(schema, announcement);
  };
}

module.exports = new AnnouncementValidator();
