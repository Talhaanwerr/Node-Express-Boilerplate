const { Op } = require("sequelize");
const DesignationRepo = require("../repos/DesignationRepo.js");
const {
    validateCreateDesignation,
    validateUpdateDesignation,
} = require("../validators/DesignationValidator.js");
const BaseController = require("./BaseController.js");

class DesignationController extends BaseController {
    constructor() {
        super();
    }

    // Get designation by ID
    getDesignationById = async(req, res) => {
        const { id } = req.params;
        try {
            const designation = await DesignationRepo.findById(id);

            if (!designation) {
                return this.errorResponse(res, "Designation ID not found", 404);
            }

            return this.successResponse(res, designation, "Designation retrieved successfully");
        } catch (error) {
            return this.errorResponse(res, "An error occurred while retrieving the designation.", 500);
        }
    };

    // Get all designations with pagination, sorting, and filtering
    getAllDesignations = async(req, res) => {
        const sortOrder = req.query.sortOrder || "id";
        const sortDirection = req.query.sortDirection || "DESC";
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.skip) || 0;

        // Validate pagination parameters
        if (limit < 1 || offset < 0) {
            return this.validationErrorResponse(res, "Invalid pagination parameters");
        }

        // Build the query
        const customQuery = {
            order: [
                [sortOrder, sortDirection]
            ],
            where: { isDeleted: false },
            limit,
            offset,
        };

        // Apply filtering based on designation_name query parameter
        if (req.query.designation_name) {
            customQuery.where.designation_name = {
                [Op.like]: `%${req.query.designation_name}%`,
            };
        }

        try {
            // Fetch designations and their count
            const designations = await DesignationRepo.getDesignations(customQuery);
            const count = await DesignationRepo.countDesignation();

            return this.successResponse(res, { designations, total: count, limit, offset }, "Designations retrieved successfully");
        } catch (error) {
            return this.errorResponse(res, "An error occurred while retrieving designations.", 500);
        }
    };

    // Create new designation
    createDesignation = async(req, res) => {
        const validationResult = validateCreateDesignation(req.body);

        if (!validationResult.status) {
            return this.validationErrorResponse(res, validationResult.message);
        }

        try {
            // Check if designation name already exists
            const existingDesignation = await DesignationRepo.isDesignationExists(req.body.designation_name);
            if (existingDesignation) {
                return this.errorResponse(res, "Designation name already exists", 400);
            }

            // Create the new designation
            const designation = await DesignationRepo.createDesignation(req.body);
            return this.successResponse(res, designation, "Designation created successfully");
        } catch (error) {
            return this.errorResponse(res, "An error occurred while creating the designation.", 500);
        }
    };

    // Update designation by ID
    updateDesignation = async(req, res) => {
        const { id } = req.params;
        const validationResult = validateUpdateDesignation(req.body);

        if (!validationResult.status) {
            return this.validationErrorResponse(res, validationResult.message);
        }

        try {
            // Check if the designation exists
            const isDesignation = await DesignationRepo.isDesignationExists(id);
            if (!isDesignation) {
                return this.errorResponse(res, "Designation ID not found", 404);
            }

            // Update the designation
            const designation = await DesignationRepo.updateDesignation(req.body, id);
            return this.successResponse(res, designation, "Designation updated successfully");
        } catch (error) {
            return this.errorResponse(res, "An error occurred while updating the designation.", 500);
        }
    };

    // Delete designation by ID
    deleteDesignation = async(req, res) => {
        const { id } = req.params;
        let { type } = req.query;

        try {
            // Check if the designation exists
            const isDesignation = await DesignationRepo.isDesignationExists(id);
            if (!isDesignation) {
                return this.errorResponse(res, "Designation ID not found", 404);
            }

            // Default to soft delete if no type is provided
            type = type && type !== "" ? type : "soft";

            // Perform the deletion
            const designation = await DesignationRepo.deleteDesignation(id, type);
            return this.successResponse(res, designation, `Designation with ID ${id} deleted successfully`);
        } catch (error) {
            return this.errorResponse(res, "An error occurred while deleting the designation.", 500);
        }
    };
}

module.exports = new DesignationController();