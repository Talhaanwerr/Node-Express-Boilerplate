const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class PermissionValidator extends BaseValidator {
  // constructor() {
  //   const schema = Joi.object().keys({
  //     // ...schema definition
  //   });
  //   super(schema);
  // }

  validateCreatePermission = (permission) => {
    const schema = Joi.object().keys({
      name: Joi.string().required().label("Permission Name"),
      module: Joi.string().required().label("Module"),
      isDeleted: Joi.boolean().optional(),
    });

    return this.validate(schema, permission);
  };

  validateUpdatePermission = (permission) => {
    const schema = Joi.object().keys({
      name: Joi.string().optional().label("Permission Name"),
      module: Joi.string().optional().label("Module"),
      isDeleted: Joi.boolean().optional(),
    });

    return this.validate(schema, permission);
  };
}

module.exports = new PermissionValidator();
