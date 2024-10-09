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
        const designation = await DesignationRepo.findById(id);

        if (!designation) {
            return this.errorResponse(res, "Designation ID not found", 404);
        }

        return this.successResponse(res, designation, "Designation retrieved successfully");
    };

    // Get all designations with optional sorting and filters
    getAllDesignations = async(req, res) => {
        const sortOrder = req.query.sortOrder || "id"; // Default sorting by 'id'
        const sortDirection = req.query.sortDirection || "DESC"; // Default sorting direction

        const limit = parseInt(req.query.limit) || 10; // Default limit for pagination
        const offset = parseInt(req.query.skip) || 0; // Default offset for pagination

        // Validate limit and offset
        if (limit < 1 || offset < 0) {
            return this.validationErrorResponse(res, "Invalid pagination parameters");
        }

        const customQuery = {
            order: [
                [sortOrder, sortDirection] // Sorting is applied here
            ],
            where: {}, // This is where filtering conditions will be added
            limit: limit, // Pagination limit
            offset: offset, // Pagination offset
        };

        // Search by designation_name
        if (req.query.designation_name) {
            customQuery.where.designation_name = {
                [Op.like]: `%${req.query.designation_name}%`, // Searching for designation_name
            };
        }

        const designations = await DesignationRepo.getDesignations(customQuery);
        const count = await DesignationRepo.countDesignation({ where: customQuery.where });

        return this.successResponse(res, {
            designations, // Results after applying filtering and pagination
            total: count,
            limit: limit,
            offset: offset,
        }, "Designations retrieved successfully");
    };

    // Create a new designation
    createDesignation = async(req, res) => {
        const validationResult = validateCreateDesignation(req.body);

        if (!validationResult.status) {
            return this.validationErrorResponse(res, validationResult.message);
        }

        const designation = await DesignationRepo.createDesignation(req.body);

        return this.successResponse(res, designation, "Designation created successfully");
    };

    // Update designation by ID
    updateDesignation = async(req, res) => {
        const { id } = req.params;
        const validationResult = validateUpdateDesignation(req.body);

        if (!validationResult.status) {
            return this.validationErrorResponse(res, validationResult.message);
        }

        const isDesignation = await DesignationRepo.isDesignationExists(id); // Check if designation exists

        if (!isDesignation) {
            return this.errorResponse(res, "Designation ID not found", 404);
        }

        const designation = await DesignationRepo.updateDesignation(req.body, id);

        return this.successResponse(res, designation, "Designation updated successfully");
    };

    // Delete designation by ID (soft or hard delete)
    deleteDesignation = async(req, res) => {
        const { id } = req.params;
        let { type } = req.query;

        const isDesignation = await DesignationRepo.isDesignationExists(id); // Check if designation exists

        if (!isDesignation) {
            return this.errorResponse(res, "Designation ID not found", 404);
        }

        type = (type && type !== "") ? type : "soft"; // Default to soft delete

        const designation = await DesignationRepo.deleteDesignation(id, type);

        return this.successResponse(res, designation, `Designation with ID ${id} deleted successfully`);
    };
}

module.exports = new DesignationController();