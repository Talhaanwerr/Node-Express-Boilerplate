const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class UserValidator extends BaseValidator {
  validateCreateUser = (user) => {
    const schema = Joi.object().keys({
      firstName: Joi.string().required().label("First Name"),
      lastName: Joi.string().optional().label("Last Name"),
      email: Joi.string().email().required().label("Email"),
      password: Joi.string().optional().label("Password"),
      shiftTime: Joi.string().optional().label("Shift Time"),
      status: Joi.string().optional().label("Status"),
      designationId: Joi.number().optional().label("Designation ID"),
      roleId: Joi.number().optional().label("Role ID"),
      profilePicture: Joi.binary().optional().label("Profile Picture"),
      isDeleted: Joi.boolean().optional(),
      isNewUser: Joi.boolean().optional(),
      secondaryReporting: Joi.number().optional(),
      primaryReporting: Joi.number().optional(),
    });

    return this.validate(schema, user);
  };

  validateCreateUserWithProfile = (user) => {
    const schema = Joi.object().keys({
      firstName: Joi.string().required().label("First Name"),
      lastName: Joi.string().required().label("Last Name"),
      email: Joi.string().email().required().label("Email"),
      password: Joi.string().required().label("Password"),
      shiftTime: Joi.string().optional().label("Shift Time"),
      status: Joi.string().optional().label("Status"),
      reportingTo: Joi.number().optional().label("Reporting To"),
      designationId: Joi.number().required().label("Designation ID"),
      roleId: Joi.number().required().label("Role ID"),
      profilePicture: Joi.binary().optional().label("Profile Picture"),
      isDeleted: Joi.boolean().optional(),
      profile: Joi.object()
        .keys({
          contactNo: Joi.string().required().label("Contact Number"),
          emergencyContact: Joi.string().required().label("Emergency Contact"),
          cnicNo: Joi.string().required().label("CNIC"),
          dateOfBirth: Joi.date().iso().required().label("Date of Birth"),
          city: Joi.string().required().label("City"),
          gender: Joi.string()
            .valid("Male", "Female", "Other")
            .required()
            .label("Gender"),
          address: Joi.string().required().label("Address"),
          joinedDate: Joi.date().iso().required().label("Joined Date"),
          branch: Joi.string().required().label("Branch"),
          isDeleted: Joi.boolean().optional(),
        })
        .required()
        .label("Profile"),
    });

    return this.validate(schema, user);
  };

  validateUpdateUser = (user) => {
    const schema = Joi.object().keys({
      firstName: Joi.string().optional().label("First Name"),
      lastName: Joi.string().optional().label("Last Name"),
      email: Joi.string().email().optional().label("Email"),
      password: Joi.string().optional().label("Password"),
      shiftTime: Joi.string().optional().label("Shift Time"),
      status: Joi.string().optional().label("Status"),
      reportingTo: Joi.number().optional().label("Reporting To"),
      designationId: Joi.number().optional().label("Designation ID"),
      roleId: Joi.number().optional().label("Role ID"),
      isDeleted: Joi.boolean().optional(),
      secondaryReporting: Joi.number().optional(),
      primaryReporting: Joi.number().optional(),
    });

    return this.validate(schema, user);
  };
}

module.exports = new UserValidator();
