// const { Op } = require("sequelize");
const {
  calculateAttendance,
  formatAttendanceResponse,
} = require("../utils/attendance.js");
const AttendanceRepo = require("../repos/AttendanceRepo.js");
const {
  validateCreateAttendance,
  validateUpdateAttendance,
} = require("../validators/AttendanceValidator.js");
const BaseController = require("./BaseController.js");
const UserRepo = require("../repos/UserRepo.js");

class AttendanceController extends BaseController {
  constructor() {
    super();
  }

  manageAttendance = async (req, res) => {
    const { checkIn, checkOut, date } = req?.body;
    const userId = req?.user?.id;

    const isCheckIn = !!checkIn;
    const isCheckOut = !!checkOut;

    const validationResult = isCheckIn
      ? validateCreateAttendance(req?.body)
      : validateUpdateAttendance(req?.body);

    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const isUser = await UserRepo?.findById(userId);

    if (!isUser) {
      return this.errorResponse(res, "User not found", 404);
    }

    if (isCheckIn) {
      const newAttendance = await AttendanceRepo?.createAttendance({
        userId,
        checkIn,
        date,
      });
      return this.successResponse(
        res,
        newAttendance,
        "Checked in successfully"
      );
    }

    if (isCheckOut) {
      const { id } = req?.params;
      const updatedAttendance = await AttendanceRepo?.updateAttendance(
        req?.body,
        id
      );
      return this.successResponse(
        res,
        updatedAttendance,
        "Checked out successfully"
      );
    }

    return this.errorResponse(
      res,
      "Invalid request: checkIn or checkOut required",
      400
    );
  };

  getAllAttendances = async (req, res) => {
    const {
      page = 1,
      limit = 10,
      date,
      sort = "date",
      order = "desc",
      search,
    } = req.query;

    const offset = (page - 1) * limit;

    const whereClause = {};

    if (date) {
      whereClause.date = date;
    }

    if (search) {
      whereClause["$user.firstName$"] = { [Op.like]: `%${search}%` };
    }

    const attendances = await AttendanceRepo.getAttendance({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sort, order]],
    });

    if (!attendances || attendances.length === 0) {
      return this.errorResponse(res, "No attendance found", 404);
    }

    const updatedAttendances = attendances.map(calculateAttendance);
    const attendanceResponse = formatAttendanceResponse(updatedAttendances);

    return this.successResponse(
      res,
      attendanceResponse,
      "Attendances retrieved successfully"
    );
  };

  getAttendanceById = async (req, res) => {
    const { id } = req?.params;
    const attendance = await AttendanceRepo?.findByIdWithInclude(id);

    if (!attendance) {
      return this.errorResponse(res, `Attendance with ID ${id} not found`, 404);
    }

    const calculatedAttendance = calculateAttendance(attendance);

    const attendanceResponse = formatAttendanceResponse(calculatedAttendance);

    return this.successResponse(
      res,
      attendanceResponse,
      `Attendance with ID ${id} retrieved successfully`
    );
  };

  getAttendanceByUserId = async (req, res) => {
    const { userId } = req?.params;

    const attendance = await AttendanceRepo?.findByUserId(userId);

    if (!attendance || attendance.length === 0) {
      return this.errorResponse(res, "Attendance not found", 404);
    }

    const updatedAttendances = attendance?.map(calculateAttendance);

    const attendanceResponse = formatAttendanceResponse(updatedAttendances);

    return this.successResponse(
      res,
      attendanceResponse,
      `Attendance for user with ID ${userId} retrieved successfully`
    );
  };

  createAttendance = async (req, res) => {
    const userId = req?.user?.id;

    const validationResult = validateUpdateAttendance(req?.body);

    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const isUser = await UserRepo?.findById(userId);

    if (!isUser) {
      return this.errorResponse(res, `User with ID ${userId} not found`, 404);
    }

    const attendanceData = {
      ...req.body,
      userId,
    };

    const updatedAttendance = await AttendanceRepo?.createAttendance(
      attendanceData
    );

    return this.successResponse(
      res,
      updatedAttendance,
      `Attendance created successfully`
    );
  };
}

module.exports = new AttendanceController();
