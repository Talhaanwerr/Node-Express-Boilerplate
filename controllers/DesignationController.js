<<<<<<< HEAD
// const { Op } = require("sequelize");
// const DesignationRepo = require("../repos/DesignationRepo.js");
// const {
//     validateCreateDesignation,
//     validateUpdateDesignation,
// } = require("../validators/DesignationValidator.js");
// const BaseController = require("./BaseController.js");

// class DesignationController extends BaseController {
//     constructor() {
//         super();
//     }

//     getDesignationById = async(req, res) => {
//         const { id } = req.params;
//         const designation = await DesignationRepo.findById(id);

//         if (!designation) {
//             return this.errorResponse(res, "Designation ID not found", 404);
//         }

//         return this.successResponse(
//             res,
//             designation,
//             "Designation retrieved successfully"
//         );
//     };

//     getAllDesignations = async(req, res) => {
//         const sortOrder = req.query.sortOrder || "id";
//         const sortDirection = req.query.sortDirection || "DESC";

//         const limit = parseInt(req.query.limit) || 10;
//         const offset = parseInt(req.query.skip) || 0;

//         if (limit < 1 || offset < 0) {
//             return this.validationErrorResponse(res, "Invalid pagination parameters");
//         }

//         const customQuery = {
//             order: [
//                 [sortOrder, sortDirection]
//             ],
//             where: {},
//             limit: limit,
//             offset: offset,
//         };

//         customQuery.where.isDeleted = false;

//         if (req.query.designation_name) {
//             customQuery.where.designation_name = {
//                 [Op.like]: `%${req.query.designation_name}%`,
//             };
//         }

//         const designations = await DesignationRepo.getDesignations(customQuery);
//         const count = await DesignationRepo.countDesignation();

//         return this.successResponse(
//             res, {
//                 designations,
//                 total: count,
//                 limit: limit,
//                 offset: offset,
//             },
//             "Designations retrieved successfully"
//         );
//     };

//     createDesignation = async(req, res) => {
//         const validationResult = validateCreateDesignation(req.body);

//         if (!validationResult.status) {
//             return this.validationErrorResponse(res, validationResult.message);
//         }

//         const designation = await DesignationRepo.createDesignation(req.body);

//         return this.successResponse(
//             res,
//             designation,
//             "Designation created successfully"
//         );
//     };

//     updateDesignation = async(req, res) => {
//         const { id } = req.params;
//         const validationResult = validateUpdateDesignation(req.body);

//         if (!validationResult.status) {
//             return this.validationErrorResponse(res, validationResult.message);
//         }

//         const isDesignation = await DesignationRepo.isDesignationExists(id);

//         if (!isDesignation) {
//             return this.errorResponse(res, "Designation ID not found", 404);
//         }

//         const designation = await DesignationRepo.updateDesignation(req.body, id);

//         return this.successResponse(
//             res,
//             designation,
//             "Designation updated successfully"
//         );
//     };

//     deleteDesignation = async(req, res) => {
//         const { id } = req.params;
//         let { type } = req.query;

//         const isDesignation = await DesignationRepo.isDesignationExists(id);

//         if (!isDesignation) {
//             return this.errorResponse(res, "Designation ID not found", 404);
//         }

//         type = type && type !== "" ? type : "soft";

//         const designation = await DesignationRepo.deleteDesignation(id, type);

//         return this.successResponse(
//             res,
//             designation,
//             `Designation with ID ${id} deleted successfully`
//         );
//     };
// }

// module.exports = new DesignationController();

=======
>>>>>>> 14038611f552d5a12ec5c5ed9451dbddbf9720ee
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

<<<<<<< HEAD
    getDesignationById = async(req, res) => {
        const { id } = req.params;

        // Validate ID format
        if (!id || typeof id !== 'string') {
            return this.validationErrorResponse(res, "Invalid ID format", 400);
        }

        try {
            const designation = await DesignationRepo.findById(id);

            if (!designation) {
                return this.errorResponse(res, "Designation ID not found", 404);
            }

            return this.successResponse(
                res,
                designation,
                "Designation retrieved successfully"
            );
        } catch (error) {
            console.error("Error fetching designation:", error);
            return this.errorResponse(res, "Something went wrong", 500);
        }
    };

    getAllDesignations = async(req, res) => {
        const sortOrder = req.query.sortOrder || "id";
        const sortDirection = req.query.sortDirection || "DESC";

        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.skip) || 0;

        if (limit < 1 || offset < 0) {
            return this.validationErrorResponse(res, "Invalid pagination parameters");
        }

        const customQuery = {
            order: [
                [sortOrder, sortDirection]
            ],
            where: {
                isDeleted: false
            },
            limit: limit,
            offset: offset,
        };

        if (req.query.designation_name) {
            customQuery.where.designation_name = {
                [Op.like]: `%${req.query.designation_name}%`,
            };
        }

        try {
            const designations = await DesignationRepo.getDesignations(customQuery);
            const count = await DesignationRepo.countDesignation();

            return this.successResponse(
                res, {
                    designations,
                    total: count,
                    limit: limit,
                    offset: offset,
                },
                "Designations retrieved successfully"
            );
        } catch (error) {
            console.error("Error retrieving designations:", error);
            return this.errorResponse(res, "Something went wrong", 500);
        }
    };

    createDesignation = async(req, res) => {
        const validationResult = validateCreateDesignation(req.body);

        if (!validationResult.status) {
            return this.validationErrorResponse(res, validationResult.message);
        }

        try {
            const designation = await DesignationRepo.createDesignation(req.body);
            return this.successResponse(
                res,
                designation,
                "Designation created successfully"
            );
        } catch (error) {
            console.error("Error creating designation:", error);
            return this.errorResponse(res, "Something went wrong", 500);
        }
    };

=======
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
>>>>>>> 14038611f552d5a12ec5c5ed9451dbddbf9720ee
    updateDesignation = async(req, res) => {
        const { id } = req.params;
        const validationResult = validateUpdateDesignation(req.body);

        if (!validationResult.status) {
            return this.validationErrorResponse(res, validationResult.message);
        }

<<<<<<< HEAD
        try {
            const isDesignation = await DesignationRepo.isDesignationExists(id);

            if (!isDesignation) {
                return this.errorResponse(res, "Designation ID not found", 404);
            }

            const designation = await DesignationRepo.updateDesignation(req.body, id);

            return this.successResponse(
                res,
                designation,
                "Designation updated successfully"
            );
        } catch (error) {
            console.error("Error updating designation:", error);
            return this.errorResponse(res, "Something went wrong", 500);
        }
=======
        const isDesignation = await DesignationRepo.isDesignationExists(id); // Check if designation exists

        if (!isDesignation) {
            return this.errorResponse(res, "Designation ID not found", 404);
        }

        const designation = await DesignationRepo.updateDesignation(req.body, id);

        return this.successResponse(res, designation, "Designation updated successfully");
>>>>>>> 14038611f552d5a12ec5c5ed9451dbddbf9720ee
    };

    // Delete designation by ID (soft or hard delete)
    deleteDesignation = async(req, res) => {
        const { id } = req.params;
        let { type } = req.query;

<<<<<<< HEAD
        try {
            const isDesignation = await DesignationRepo.isDesignationExists(id);

            if (!isDesignation) {
                return this.errorResponse(res, "Designation ID not found", 404);
            }

            type = type && type !== "" ? type : "soft";
            const designation = await DesignationRepo.deleteDesignation(id, type);

            return this.successResponse(
                res,
                designation,
                `Designation with ID ${id} deleted successfully`
            );
        } catch (error) {
            console.error("Error deleting designation:", error);
            return this.errorResponse(res, "Something went wrong", 500);
        }
=======
        const isDesignation = await DesignationRepo.isDesignationExists(id); // Check if designation exists

        if (!isDesignation) {
            return this.errorResponse(res, "Designation ID not found", 404);
        }

        type = (type && type !== "") ? type : "soft"; // Default to soft delete

        const designation = await DesignationRepo.deleteDesignation(id, type);

        return this.successResponse(res, designation, `Designation with ID ${id} deleted successfully`);
>>>>>>> 14038611f552d5a12ec5c5ed9451dbddbf9720ee
    };
}

module.exports = new DesignationController();