const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class UserValidator extends BaseValidator {
    // constructor() {
    //   const schema = Joi.object().keys({
    //     // ...schema definition
    //   });
    //   super(schema);
    // }

    validateCreateUser(user) {
        const schema = Joi.object().keys({
            name: Joi.string().required().label("User Name"),
            email: Joi.string().email().required().label("Email"),
            imageUrl: Joi.string().required().label("Image Url"),
            googleCalendarAccessToken: Joi.string().optional().label("Google Calendar Access Token"),
            platform: Joi.string().required().label("Platform"),
            code: Joi.string().allow("").optional().label("Code"),
            firstName: Joi.string().allow("").optional().label("First Name"),
            lastName: Joi.string().allow("").optional().label("Last Name"),

        });

        return this.validate(schema, user);
    }

}

module.exports = new UserValidator();
