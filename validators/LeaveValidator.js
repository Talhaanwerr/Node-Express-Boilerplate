const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class LeaveValidator extends BaseValidator {
  validateCreateLeave = (leave) => {
    const schema = Joi.object().keys({
      typeOfLeave: Joi.string().required().label("Type of leave"),
      availableLeaves: Joi.number().optional().label("Available Leaves"),
      usedLeaves: Joi.number().optional().label("Used Leaves"),
      totalLeaves: Joi.number().optional().label("Total Leaves"),
      bookedLeaves: Joi.number().optional().label("Booked Leaves"),
    });

    return this.validate(schema, leave);
  };

  validateUpdateLeave = (leave) => {
    const schema = Joi.object().keys({
      typeOfLeave: Joi.string().optional().label("Type of leave"),
      availableLeaves: Joi.number().optional().label("Available Leaves"),
      usedLeaves: Joi.number().optional().label("Used Leaves"),
      totalLeaves: Joi.number().optional().label("Total Leaves"),
      bookedLeaves: Joi.number().optional().label("Booked Leaves"),
    });

    return this.validate(schema, leave);
  };
}

module.exports = new LeaveValidator();
