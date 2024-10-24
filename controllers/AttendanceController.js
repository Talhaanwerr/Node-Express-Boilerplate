const { Op, fn, col } = require("sequelize");
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
const { sequelize } = require("../models");

class AttendanceController extends BaseController {
  constructor() {
    super();
  }

  manageAttendance = async (req, res) => {
    let { checkIn, checkOut, date } = req?.body;
    let userId = req?.user?.id;

    if (!date) {
      return this.errorResponse(res, "Date is required", 400);
    }

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
      const [attendance] = await sequelize.query(
        `SELECT * FROM Attendances WHERE userId = :userId AND date = :date`,
        {
          replacements: { userId, date },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      if (!attendance) {
        return this.errorResponse(res, "Attendance record not found", 404);
      }

      const updatedAttendance = await AttendanceRepo?.updateAttendance(
        { checkOut },
        attendance?.id
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
      month,
      year,
      sort = "date",
      order = "desc",
      search,
      from,
      to,
    } = req?.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    if (pageNum < 1 || limitNum < 1) {
      return this.errorResponse(
        res,
        "Page and limit must be positive integers",
        400
      );
    }

    const offset = (pageNum - 1) * limitNum;
    const whereClause = {};

    if (date) {
      const formattedDate = new Date(date).toISOString().split("T")[0];
      whereClause.date = formattedDate;
    } else {
      if (from && to) {
        whereClause.date = {
          [Op.between]: [new Date(from), new Date(to)],
        };
      } else if (from) {
        whereClause.date = {
          [Op.gte]: new Date(from),
        };
      } else if (to) {
        whereClause.date = {
          [Op.lte]: new Date(to),
        };
      }
    }

    if (month && year) {
      whereClause.date = {
        [Op.and]: [
          sequelize.where(fn("MONTH", col("date")), month),
          sequelize.where(fn("YEAR", col("date")), year),
        ],
      };
    } else if (month) {
      whereClause.date = {
        [Op.and]: [sequelize.where(fn("MONTH", col("date")), month)],
      };
    } else if (year) {
      whereClause.date = {
        [Op.and]: [sequelize.where(fn("YEAR", col("date")), year)],
      };
    }

    if (search) {
      whereClause["$user.firstName$"] = {
        [Op.like]: `%${search.toLowerCase()}%`,
      };
    }

    try {
      const attendances = await AttendanceRepo.getAttendance({
        where: whereClause,
        limit: limitNum,
        offset: offset,
        order: [[sort === "id" ? "id" : "date", order.toLowerCase()]],
      });

      if (!attendances || attendances.length === 0) {
        return this.errorResponse(res, "No attendance records found", 404);
      }

      const updatedAttendances = attendances.map(calculateAttendance);
      const attendanceResponse = formatAttendanceResponse(updatedAttendances);

      return this.successResponse(
        res,
        attendanceResponse,
        "Attendances retrieved successfully"
      );
    } catch (error) {
      console.error("Error fetching attendances: ", error);
      return this.errorResponse(
        res,
        "Something went wrong while fetching attendances",
        500
      );
    }
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
