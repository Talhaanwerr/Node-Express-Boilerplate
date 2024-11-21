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

  validateCreateLeaveRequest = (leave) => {
    const schema = Joi.object().keys({
      leaveType: Joi.string().required().label("Leave Type"),
      year: Joi.number().optional().label("Leave Year"),
      leavePeriod: Joi.string().optional().label("Type"),
      status: Joi.string().optional().label("Status"),
      startDate: Joi.date().required().label("Start Date"),
      endDate: Joi.date().required().label("End Date"),
      description: Joi.string().required().label("Description"),
    });

    return this.validate(schema, leave);
  };

  validateUpdateLeaveRequest = (leave) => {
    const schema = Joi.object().keys({
      id: Joi.number().required().label("Id"),
      leaveType: Joi.string().optional().label("Leave Type"),
      year: Joi.number().optional().label("Leave Year"),
      leavePeriod: Joi.string().optional().label("Type"),
      status: Joi.string().optional().label("Status"),
      startDate: Joi.date().optional().label("Start Date"),
      endDate: Joi.date().optional().label("End Date"),
      description: Joi.string().optional().label("Description"),
    });

    return this.validate(schema, leave);
  };
}

module.exports = new LeaveValidator();
