const Joi = require("joi");
const BaseValidator = require("./BaseValidator");

class UserPermissionValidator extends BaseValidator {
    validateAssignPermissions = (data) => {
        const schema = Joi.object({
            userId: Joi.number().required().label("User ID"),
            permissions: Joi.array()
                .items(Joi.number())
                .required()
                .label("Permissions"),
        });

        return this.validate(schema, data);
    };

    validateUpdateUserPermission = (data) => {
        const schema = Joi.object({
            permissionId: Joi.number().required().label("Permission ID"),
            isDeleted: Joi.boolean().optional().label("Deleted Record"),
        });

        return this.validate(schema, data);
    };
}

module.exports = new UserPermissionValidator();