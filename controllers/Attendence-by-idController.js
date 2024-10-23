// controllers/AttendanceController.js
const AttendanceRepo = require("../repos/Attendance-by-idRepo.js");
const {
    validateCreateAttendance,
    validateUpdateAttendance,
} = require("../validators/Attendance-by-idValidator.js");
const BaseController = require("./BaseController.js");

class AttendanceController extends BaseController {
    constructor() {
        super();
    }

    // Get all attendance records with searching, filtering, sorting, and pagination
    getAllAttendances = async(req, res) => {
        try {
            const {
                page = 1,
                    limit = 10,
                    sort = "date",
                    order = "ASC",
                    search = "",
                    filterByStatus, //  'present', 'absent'
                    filterByDate, // '2024-01-01'
            } = req.query;

            // Validate and sanitize inputs
            const pageNumber = parseInt(page);
            const limitNumber = parseInt(limit);

            // Define the offset for pagination
            const offset = (pageNumber - 1) * limitNumber;

            // Call the repository method to get attendances with pagination, search, and filters
            const attendances = await AttendanceRepo.findAll({
                offset,
                limit: limitNumber,
                sort,
                order,
                search,
                filterByStatus,
                filterByDate,
            });

            return this.successResponse(res, attendances, "All attendance records retrieved successfully");
        } catch (error) {
            return this.errorResponse(res, "An error occurred while retrieving attendance records", 500);
        }
    };

    // Get attendance record by ID
    getAttendanceById = async(req, res) => {
        const { id } = req.params;

        try {
            const attendance = await AttendanceRepo.findById(id);
            if (!attendance) {
                return this.errorResponse(res, "Attendance record not found", 404);
            }
            return this.successResponse(res, attendance, "Attendance record retrieved successfully");
        } catch (error) {
            return this.errorResponse(res, "An error occurred while retrieving the attendance record", 500);
        }
    };

    // Create new attendance record
    createAttendance = async(req, res) => {
        const validationResult = validateCreateAttendance(req.body);

        if (!validationResult.status) {
            return this.validationErrorResponse(res, validationResult.message);
        }

        try {
            const attendance = await AttendanceRepo.createAttendance(req.body);
            return this.successResponse(res, attendance, "Attendance record created successfully");
        } catch (error) {
            return this.errorResponse(res, "An error occurred while creating the attendance record", 500);
        }
    };

    // Update attendance record
    updateAttendance = async(req, res) => {
        const { id } = req.params;
        const validationResult = validateUpdateAttendance(req.body);

        if (!validationResult.status) {
            return this.validationErrorResponse(res, validationResult.message);
        }

        try {
            const attendanceExists = await AttendanceRepo.findById(id);
            if (!attendanceExists) {
                return this.errorResponse(res, "Attendance record not found", 404);
            }

            const updatedAttendance = await AttendanceRepo.updateAttendance(id, req.body);
            return this.successResponse(res, updatedAttendance, "Attendance record updated successfully");
        } catch (error) {
            return this.errorResponse(res, "An error occurred while updating the attendance record", 500);
        }
    };

    // Delete attendance record (soft delete)
    deleteAttendance = async(req, res) => {
        const { id } = req.params;

        try {
            const attendanceExists = await AttendanceRepo.findById(id);
            if (!attendanceExists) {
                return this.errorResponse(res, "Attendance record not found", 404);
            }

            await AttendanceRepo.deleteAttendance(id);
            return this.successResponse(res, null, `Attendance record with ID ${id} deleted successfully`);
        } catch (error) {
            return this.errorResponse(res, "An error occurred while deleting the attendance record", 500);
        }
    };
}

module.exports = new AttendanceController();