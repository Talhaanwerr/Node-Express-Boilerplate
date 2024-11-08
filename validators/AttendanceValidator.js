const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class AttendanceValidator extends BaseValidator {
  validateCreateAttendance = (attendance) => {
    const schema = Joi.object().keys({
      // userId: Joi.number().required(),
      checkIn: Joi.string()
        .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/)
        .optional(),
      checkOut: Joi.string()
        .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/)
        .optional(),
      workedHours: Joi.string().optional(),
      date: Joi.date().required(),
      reason: Joi.string().optional(),
      description: Joi.string().optional(),
      type: Joi.string().optional(),
    });

    return this.validate(schema, attendance);
  };

  validateUpdateAttendance = (attendance) => {
    const schema = Joi.object().keys({
      // userId: Joi.number().required(),
      checkIn: Joi.string()
        .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/)
        .optional(),
      checkOut: Joi.string()
        .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/)
        .optional(),
      date: Joi.date().optional(),
      reason: Joi.string().optional(),
      description: Joi.string().optional(),
      type: Joi.string().optional(),
    });

    return this.validate(schema, attendance);
  };
}

module.exports = new AttendanceValidator();
