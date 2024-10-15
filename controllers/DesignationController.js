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

    // Designation ID se designation lena
    getDesignationById = async(req, res) => {
        const { id } = req.params;

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

    // Saari designations lena with pagination aur filtering
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
            where: { isDeleted: false },
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
                res, { designations, total: count, limit: limit, offset: offset },
                "Designations retrieved successfully"
            );
        } catch (error) {
            console.error("Error retrieving designations:", error);
            return this.errorResponse(res, "Something went wrong", 500);
        }
    };

    // Naya designation banana
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

    // Designation update karna
    updateDesignation = async(req, res) => {
        const { id } = req.params;
        const validationResult = validateUpdateDesignation(req.body);

        if (!validationResult.status) {
            return this.validationErrorResponse(res, validationResult.message);
        }

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
    };

    // Designation delete karna
    deleteDesignation = async(req, res) => {
        const { id } = req.params;
        let { type } = req.query;

        try {
            const isDesignation = await DesignationRepo.isDesignationExists(id);

            if (!isDesignation) {
                return this.errorResponse(res, "Designation ID not found", 404);
            }

            type = (type && type !== "") ? type : "soft"; // Default to soft delete

            const designation = await DesignationRepo.deleteDesignation(id, type);

            return this.successResponse(res, designation, `Designation with ID ${id} deleted successfully`);
        } catch (error) {
            console.error("Error deleting designation:", error);
            return this.errorResponse(res, "Something went wrong", 500);
        }
    };
}

module.exports = new DesignationController();