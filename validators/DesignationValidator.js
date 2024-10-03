const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class DesignationValidator extends BaseValidator {
    // constructor() {
    //   const schema = Joi.object().keys({
    //     // ...schema definition
    //   });
    //   super(schema);
    // }

    validateCreateDesignation = (designation) => {
        const schema = Joi.object().keys({
            id: Joi.number().integer().positive().label("ID"),
            designation_name: Joi.string().required().label("Designation Name"),
            // description: Joi.string().optional().label("Description"),
            // type: Joi.string().optional().label("Type"),
            // isDeleted: Joi.boolean().optional().label("Is Deleted"),
            createdAt: Joi.date().optional().label("Created At"),
            updatedAt: Joi.date().optional().label("Updated At"),
        });

        return schema.validate(designation);
    };

}

module.exports = new DesignationValidator();