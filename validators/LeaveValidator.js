const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class LeaveValidator extends BaseValidator {
  validateCreateLeave = (data) => {
    const schema = Joi.object({
      type_of_leave: Joi.string().required().label("Leave Type"),
      available: Joi.number().min(0).required().label("Available Leaves"),
    });

    return this.validate(schema, data);
  };

  validateUpdateLeave = (data) => {
    const schema = Joi.object({
      available: Joi.number().optional().label("Available Leaves"),
      used: Joi.number().optional().label("Used Leaves"),
    });

    return this.validate(schema, data);
  };
}

module.exports = new LeaveValidator();
