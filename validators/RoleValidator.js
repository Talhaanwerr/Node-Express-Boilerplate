const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class RoleValidator extends BaseValidator {
 

  validateCreateRole = (role) => {
    const schema = Joi.object().keys({
      roleName: Joi.string().required().label("Role Title"),
      isDeleted: Joi.boolean().optional().label("Deleted Record")
    });

    return this.validate(schema, role);
  };
}

module.exports = new RoleValidator();
