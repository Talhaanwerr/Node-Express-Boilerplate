const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class UserProfileValidator extends BaseValidator {
  validateCreateUserProfile = (userProfile) => {
    const schema = Joi.object().keys({
      contactNo: Joi.string().required().label("Contact No"),
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
      userId: Joi.number().required().label("User ID"),
      employeeType: Joi.string().required().label("Employee Type"),
      department: Joi.string().required().label("Department"),
      totalExperience: Joi.string().required().label("Total Experience"),
      maritalStatus: Joi.string().required().label("Marital Status"),
      aboutMe: Joi.string().optional().label("About Me"),
      emergencyContactName: Joi.string()
        .required()
        .label("Emergency Contact Name"),
      isDeleted: Joi.boolean().optional(),
    });

    return this.validate(schema, userProfile);
  };

  validateUpdateUserProfile = (userProfile) => {
    const schema = Joi.object().keys({
      contactNo: Joi.string().optional().label("Contact No"),
      emergencyContact: Joi.string().optional().label("Emergency Contact"),
      cnicNo: Joi.string().optional().label("CNIC"),
      dateOfBirth: Joi.date().iso().optional().label("Date of Birth"),
      city: Joi.string().optional().label("City"),
      gender: Joi.string()
        .valid("Male", "Female", "Other")
        .optional()
        .label("Gender"),
      address: Joi.string().optional().label("Address"),
      joinedDate: Joi.date().iso().optional().label("Joined Date"),
      branch: Joi.string().optional().label("Branch"),
      userId: Joi.number().required().label("User ID"),
      isDeleted: Joi.boolean().optional(),
    });

    return this.validate(schema, userProfile);
  };
}

module.exports = new UserProfileValidator();
