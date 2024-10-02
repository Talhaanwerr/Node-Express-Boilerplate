const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class AnnouncementValidator extends BaseValidator {
  // constructor() {
  //   const schema = Joi.object().keys({
  //     // ...schema definition
  //   });
  //   super(schema);
  // }

  validateCreateAnnouncement = (announcement) => {
    const schema = Joi.object().keys({
      name: Joi.string().required().label("Announcement Title"),
      description: Joi.string().optional().label("Description"),
      type: Joi.string().optional().label("Type"),
      isDeleted: Joi.boolean().optional(),
    });

    return this.validate(schema, announcement);
  };
}

module.exports = new AnnouncementValidator();
