// console.log("test")
const DesignationRepo = require("../repos/DesignationRepo.js");
const {
    validateCreateDesignation,
} = require("../validators/DesignationValidator.js");
const BaseController = require("./BaseController.js");

class DesignationController extends BaseController {
    constructor() {
        super();
    }

    createDestination = async(req, res) => {
        const validationResult = validateCreateDesignation(req.body);

        if (!validationResult.status) {
            return this.validationErrorResponse(res, validationResult.message);
        }

        const designation = await DesignationRepo.createDestination(req.body);

        return this.successResponse(res, designation, "designation created successfully");
    };
}

module.exports = new DesignationController();