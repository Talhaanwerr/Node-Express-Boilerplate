const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class HolidayValidator extends BaseValidator {
  validateCreateHoliday = (holiday) => {
    const schema = Joi.object({
      name: Joi.string().required().label("Holiday Name"),
      description: Joi.string().optional().label("Description"),
      type: Joi.string().optional().label("Type"),
      startDate: Joi.date().required().label("Start Date"),
      endDate: Joi.date().required().label("End Date"),
      isDeleted: Joi.boolean().optional().label("Deleted Record"),
    });

    return this.validate(schema, holiday);
  };

  validateUpdateHoliday = (holiday) => {
    const schema = Joi.object({
      name: Joi.string().optional().label("Holiday Name"),
      description: Joi.string().optional().label("Description"),
      type: Joi.string().optional().label("Type"),
      startDate: Joi.date().optional().label("Start Date"),
      endDate: Joi.date().optional().label("End Date"),
      isDeleted: Joi.boolean().optional().label("Deleted Record"),
    });

    return this.validate(schema, holiday);
  };
}

module.exports = new HolidayValidator();
