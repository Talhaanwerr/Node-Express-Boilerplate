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

            createdAt: Joi.date().optional().label("Created At"),
            updatedAt: Joi.date().optional().label("Updated At"),
        });

        return schema.validate(designation);
    };

}

module.exports = new DesignationValidator();