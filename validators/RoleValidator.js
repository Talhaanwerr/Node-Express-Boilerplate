const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class RoleValidator extends BaseValidator {
  validateCreateRole = (role) => {
    const schema = Joi.object({
      name: Joi.string().required().label("Role Title"),
      description: Joi.string().required().label("Role Description"),
      isDeleted: Joi.boolean().optional().label("Deleted Record"),
    });

    return this.validate(schema, role);
  };

  validateUpdateRole = (role) => {
    const schema = Joi.object({
      name: Joi.string().optional().label("Role Title"),
      description: Joi.string().optional().label("Role Description"),
      isDeleted: Joi.boolean().optional().label("Deleted Record"),
    });

    return this.validate(schema, role);
  };
}

module.exports = new RoleValidator();
