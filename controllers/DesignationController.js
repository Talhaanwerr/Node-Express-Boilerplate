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
        const sortOrder = (req.query && req.query.sortOrder) ? req.query.sortOrder : "id";
        const sortDirection = (req.query && req.query.sortDirection) ? req.query.sortDirection : "Desc";

        const customQuery = {
            order: [
                [sortOrder, sortDirection]
            ],
            where: {},
            limit: parseInt(req.query && req.query.limit) || 10,
            offset: parseInt(req.query && req.query.skip) || 0,
        };

        // Search by designation_name
        if (req.query && req.query.designation_name) {
            customQuery.where.designation_name = {
                [Op.like]: `%${req.query.designation_name}%`,
            };
        }

        const designations = await DesignationRepo.getDesignations(customQuery);
        const count = await DesignationRepo.countDesignation({
            where: customQuery.where,
        });

        if (!designations.length) {
            return this.errorResponse(res, "No matching designations found", 404);
        }

        return this.successResponse(
            res, {
                designations,
                total: count,
            },
            "Designations retrieved successfully"
        );
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
        let { id } = req.params;
        let { type } = req.query;

        const isDesignation = await DesignationRepo.isDesignationExists(id); // Check if designation exists

        if (!isDesignation) {
            return this.errorResponse(res, "Designation ID not found", 404);
        }

        type = (type && type !== "") ? type : "soft"; // Default to soft delete

        const designation = await DesignationRepo.deleteDesignation(id, type);

        return this.successResponse(
            res,
            designation,
            `Designation with ID ${id} deleted successfully`
        );
    };
}

module.exports = new DesignationController();