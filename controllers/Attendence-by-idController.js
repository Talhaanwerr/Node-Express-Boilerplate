// controllers/AttendanceController.js
const AttendanceRepo = require("../repos/AttendanceRepo.js");
const {
    validateCreateAttendance,
    validateUpdateAttendance,
} = require("../validators/AttendanceValidator.js");
const BaseController = require("./BaseController.js");

class AttendanceController extends BaseController {
    constructor() {
        super();
    }

    // Get attendance record by ID
    getAttendanceById = async(req, res) => {
        const { id } = req.params;

        const attendance = await AttendanceRepo.findById(id);
        if (!attendance) {
            return this.errorResponse(res, "Attendance record not found", 404);
        }
        return this.successResponse(res, attendance, "Attendance record retrieved successfully");
    };

    // Create new attendance record
    createAttendance = async(req, res) => {
        const validationResult = validateCreateAttendance(req.body);

        if (!validationResult.status) {
            return this.validationErrorResponse(res, validationResult.message);
        }

        const attendance = await AttendanceRepo.createAttendance(req.body);
        return this.successResponse(res, attendance, "Attendance record created successfully");
    };

    // Update attendance record
    updateAttendance = async(req, res) => {
        const { id } = req.params;
        const validationResult = validateUpdateAttendance(req.body);

        if (!validationResult.status) {
            return this.validationErrorResponse(res, validationResult.message);
        }

        const attendanceExists = await AttendanceRepo.findById(id);
        if (!attendanceExists) {
            return this.errorResponse(res, "Attendance record not found", 404);
        }

        const updatedAttendance = await AttendanceRepo.updateAttendance(id, req.body);
        return this.successResponse(res, updatedAttendance, "Attendance record updated successfully");
    };

    // Delete attendance record (soft delete)
    deleteAttendance = async(req, res) => {
        const { id } = req.params;

        const attendanceExists = await AttendanceRepo.findById(id);
        if (!attendanceExists) {
            return this.errorResponse(res, "Attendance record not found", 404);
        }

        await AttendanceRepo.deleteAttendance(id);
        return this.successResponse(res, null, `Attendance record with ID ${id} deleted successfully`);
    };
}

module.exports = new AttendanceController();