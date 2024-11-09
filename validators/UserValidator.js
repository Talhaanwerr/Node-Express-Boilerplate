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
      password: Joi.string().optional().label("Password"),
      shiftTime: Joi.string().optional().label("Shift Time"),
      status: Joi.string().optional().label("Status"),
      primaryReporting: Joi.number().optional().label("Primary Reporting To"),
      secondaryReporting: Joi.number()
        .optional()
        .label("Secondary Reporting To"),
      designationId: Joi.number().optional().label("Designation ID"),
      roleId: Joi.number().required().label("Role ID"),
      profilePicture: Joi.binary().optional().label("Profile Picture"),
      isDeleted: Joi.boolean().optional(),
      isNewUser: Joi.boolean().optional(),
      profile: Joi.object()
        .keys({
          contactNo: Joi.string().optional().label("Contact Number"),
          emergencyContact: Joi.string().optional().label("Emergency Contact"),
          cnicNo: Joi.string().required().label("CNIC"),
          dateOfBirth: Joi.date().iso().required().label("Date of Birth"),
          city: Joi.string().optional().label("City"),
          gender: Joi.string()
            .valid("Male", "Female", "Other")
            .optional()
            .label("Gender"),
          address: Joi.string().optional().label("Address"),
          joinedDate: Joi.date().iso().optional().label("Joined Date"),
          branch: Joi.string().optional().label("Branch"),
          employeeType: Joi.string().optional().label("Employee Type"),
          department: Joi.string().optional().label("Department"),
          totalExperience: Joi.string().optional().label("Total Experience"),
          maritalStatus: Joi.string().optional().label("Marital Status"),
          aboutMe: Joi.string().optional().label("About Me"),
          emergencyContactName: Joi.string()
            .optional()
            .label("Emergency Contact Name"),

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
