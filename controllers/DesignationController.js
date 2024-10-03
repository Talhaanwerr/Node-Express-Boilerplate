const DesignationRepo = require("../repos/DesignationRepo.js");
const {
    validateCreateDesignation,
    validateUpdateDesignation,
    validateId,
} = require("../validators/DesignationValidator.js");
const BaseController = require("./BaseController.js");

class DesignationController extends BaseController {
    constructor() {
        super();
    }

    createDesignation = async(req, res) => {
        console.log("test - create");
        const { error } = validateCreateDesignation(req.body); // Joi returns `error` object, not `status`

        if (error) {
            return this.validationErrorResponse(res, error.details[0].message); // Return the Joi validation error
        }

        const designation = await DesignationRepo.createDesignation(req.body);
        return this.successResponse(res, designation, "Designation created successfully");
    };

    findDesignation = async(req, res) => {
        console.log("test - find");


        if (req.query.id) {
            const { error } = validateId(req.query.id);

            if (error) {
                return this.validationErrorResponse(res, error.details[0].message);
            }
        }

        const designations = await DesignationRepo.findDesignation(req.query);
        return this.successResponse(res, designations, "Designations retrieved successfully");
    };

    updateDesignation = async(req, res) => {
        console.log("test - update");

        const { error: idError } = validateId(req.params.id); // Validate ID
        const { error: updateError } = validateUpdateDesignation(req.body); // Validate Update Data

        if (idError || updateError) {
            const message = idError ? idError.details[0].message : updateError.details[0].message;
            return this.validationErrorResponse(res, message);
        }

        const designation = await DesignationRepo.updateDesignation(req.body, req.params.id);
        return this.successResponse(res, designation, "Designation updated successfully");
    };

    deleteDesignation = async(req, res) => {
        console.log("test - delete");
        const { error } = validateId(req.params.id); // Validate ID

        if (error) {
            return this.validationErrorResponse(res, error.details[0].message);
        }

        await DesignationRepo.deleteDesignation(req.params.id);
        return this.successResponse(res, {}, `Designation with ID ${req.params.id} deleted successfully`);
    };
}

module.exports = new DesignationController();