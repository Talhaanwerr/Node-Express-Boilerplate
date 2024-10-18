const Joi = require("joi");
const BaseValidator = require("./BaseValidator");

class RolePermissionValidator extends BaseValidator {
  validateAssignPermissions = (data) => {
    const schema = Joi.object({
      roleId: Joi.number().required().label("Role ID"),
      permissions: Joi.array()
        .items(Joi.number())
        .required()
        .label("Permissions"),
    });

    return this.validate(schema, data);
  };

  validateUpdateRolePermission = (data) => {
    const schema = Joi.object({
      permissionId: Joi.number().required().label("Permission ID"),
      isDeleted: Joi.boolean().optional().label("Deleted Record"),
    });

    return this.validate(schema, data);
  };

}

module.exports = new RolePermissionValidator();
