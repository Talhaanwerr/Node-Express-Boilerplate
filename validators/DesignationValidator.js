const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class DesignationValidator extends BaseValidator {
    // Constructor is not necessary if we're not defining any specific schema here
    // constructor() {
    //   const schema = Joi.object().keys({
    //     // ...schema definition
    //   });
    //   super(schema);
    // }

    validateCreateDesignation = (designation) => {
        const schema = Joi.object().keys({
          designation_name: Joi.string().required().label("Designation Name"), // Required field for the designation title
          description: Joi.string().optional().label("Description"), // Optional description field
          isDeleted: Joi.boolean().optional().default(false), // Optional isDeleted field with a default value of false
          createdAt: Joi.date().optional(), // Optional field to track when the designation was created
          updatedAt: Joi.date().optional(), // Optional field to track when the designation was last updated
        });

        return this.validate(schema, designation); // Validate the input against the schema
    };

    validateUpdateDesignation = (designation) => {
        const schema = Joi.object().keys({
            designation_name: Joi.string().optional().label("Designation Name"), // Optional update for designation title
            description: Joi.string().optional().label("Description"), // Optional update for description
            // type: Joi.string().optional().label("Type"), // Optional update for type
            isDeleted: Joi.boolean().optional(), // Optional update for isDeleted field
            updatedAt: Joi.date().optional() // Optional field to track updates
        });

        return this.validate(schema, designation); // Validate the input against the update schema
    };

    validateId = (id) => {
        const schema = Joi.object().keys({
            id: Joi.number().integer().positive().required().label("ID") // Ensure the ID is a positive integer
        });

        return this.validate(schema, { id }); // Validate the ID against the schema
    };
}

module.exports = new DesignationValidator(); // Export an instance of the validator