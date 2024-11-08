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
      name: Joi.string().required().label("Designation Name"),
      description: Joi.string().optional().label("Description"),
    });

    return this.validate(schema, designation);
  };

  validateUpdateDesignation = (designation) => {
    const schema = Joi.object().keys({
      name: Joi.string().optional().label("Designation Name"),
      description: Joi.string().optional().label("Description"),
    });

    return this.validate(schema, designation);
  };

  validateId = (id) => {
    const schema = Joi.object().keys({
      id: Joi.number().integer().positive().required().label("ID"),
    });

    return this.validate(schema, { id });
  };
}

module.exports = new DesignationValidator();
