const { Op, fn, col, where } = require("sequelize");
const db = require("../models");
const {
  calculateAttendance,
  formatAttendanceResponse,
} = require("../utils/attendance.js");
const AttendanceRepo = require("../repos/AttendanceRepo.js");
const LogTimeRepo = require("../repos/LogTimeRepo.js");
const {
  validateCreateAttendance,
  validateUpdateAttendance,
} = require("../validators/AttendanceValidator.js");
const BaseController = require("./BaseController.js");
const UserRepo = require("../repos/UserRepo.js");
const { sequelize } = require("../models");
const cron = require("node-cron");

class AttendanceController extends BaseController {
  constructor() {
    super();
    this.scheduleDailyCheckIn();
  }

  scheduleDailyCheckIn() {
    cron.schedule("0 0 * * *", async () => {
      try {
        const today = new Date().toISOString().split("T")[0];

        const users = await UserRepo?.findAll();

        for (const user of users) {
          const existingAttendance = await sequelize.query(
            `SELECT * FROM Attendances WHERE userId = :userId AND date = :date`,
            {
              replacements: { userId: user?.id, date: today },
              type: sequelize.QueryTypes.SELECT,
            }
          );

          if (!existingAttendance?.length) {
            await AttendanceRepo?.createAttendance({
              userId: user?.id,
              date: today,
              checkIn: null,
              checkOut: null,
            });
          }
        }
      } catch (error) {
        console.error("Error in daily attendance check:", error);
      }
    });
  }

  manageAttendance = async (req, res) => {
    let { checkIn, checkOut, date } = req.body;
    let userId = req?.user?.id;

    const dateObj = new Date(date);
    date = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(dateObj.getDate()).padStart(2, "0")}`;

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
      const [existingAttendance] = await sequelize.query(
        `SELECT * FROM Attendances WHERE userId = :userId AND date = :date`,
        {
          replacements: { userId, date },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      if (existingAttendance) {
        const updatedAttendance = await AttendanceRepo?.updateAttendance(
          { checkIn },
          existingAttendance.id
        );
        return this.successResponse(
          res,
          updatedAttendance,
          "Check-in time updated successfully"
        );
      }

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

      if (attendance.checkOut) {
        const updatedAttendance = await AttendanceRepo?.updateAttendance(
          { checkOut },
          attendance?.id
        );
        return this.successResponse(
          res,
          updatedAttendance,
          "Check-out time updated successfully"
        );
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
      status,
      user,
    } = req.query;

    const offset = (page - 1) * limit;
    const whereClause = {};

    if (user) {
      whereClause.userId = user;
    }

    if (date) {
      const formattedDate = new Date(date).toISOString();
      whereClause.date = {
        [Op.eq]: formattedDate,
      };
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
        [Op.like]: `%${search}%`,
      };
    }

    const attendances = await AttendanceRepo?.getAttendance({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sort === "id" ? "id" : "date", order]],
      include: [
        {
          model: db.User,
          as: "user",
          attributes: ["firstName", "lastName"],
          include: [
            {
              model: db.Designation,
              as: "designation",
              attributes: ["name"],
            },
          ],
        },
      ],
    });

    const updatedAttendances = attendances?.map(calculateAttendance);

    const filteredAttendances = status
      ? updatedAttendances?.filter(
          (attendance) => attendance?.status === status
        )
      : updatedAttendances;

    const workingDaysMap = filteredAttendances?.reduce((acc, attendance) => {
      if (attendance?.checkIn) {
        const dateKey = attendance?.userId + "-" + attendance?.date;
        if (!acc[attendance.userId]) {
          acc[attendance?.userId] = new Set();
        }
        acc[attendance.userId].add(dateKey);
      }
      return acc;
    }, {});

    const workingDaysCount = Object.fromEntries(
      Object.entries(workingDaysMap).map(([userId, datesSet]) => [
        userId,
        datesSet.size,
      ])
    );

    const attendanceResponse = formatAttendanceResponse(
      filteredAttendances,
      workingDaysCount
    );

    return this.successResponse(
      res,
      { attendanceResponse },
      "Attendances retrieved successfully"
    );
  };

  getAllAttendancesDashboard = async (req, res) => {
    const customquery = {};
    const date = new Date().toISOString().split("T")[0];
    customquery.where = {
      date: {
        [Op.eq]: new Date(date).toISOString(),
      },
    };
    const attendances = await AttendanceRepo.getAttendanceTest({
      where: customquery.where,
    });

    // if (!attendances || attendances.length === 0) {
    //   return this.errorResponse(res, "No attendance found", 404);
    // }

    const bool = true;
    const attendanceResponse = formatAttendanceResponse(attendances, 0, bool);

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
    const userId = req?.params?.userId || req?.user?.id;

    if (!userId) {
      return this.errorResponse(res, "User ID is required", 400);
    }

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
      status,
    } = req.query;

    const offset = (page - 1) * limit;
    const whereClause = { userId };

    if (date) {
      whereClause.date = { [Op.eq]: new Date(date) };
    } else if (from || to) {
      whereClause.date = {};
      if (from) whereClause.date[Op.gte] = new Date(from);
      if (to) whereClause.date[Op.lte] = new Date(to);
    }

    if (month && year) {
      whereClause.date = {
        [Op.and]: [
          sequelize.where(fn("MONTH", col("date")), month),
          sequelize.where(fn("YEAR", col("date")), year),
        ],
      };
    } else if (month) {
      whereClause.date = sequelize.where(fn("MONTH", col("date")), month);
    } else if (year) {
      whereClause.date = sequelize.where(fn("YEAR", col("date")), year);
    }

    if (search) {
      whereClause[Op.or] = [
        { "$user.firstName$": { [Op.like]: `%${search}%` } },
        { "$user.lastName$": { [Op.like]: `%${search}%` } },
      ];
    }

    const attendances = await AttendanceRepo.getAttendance({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sort === "id" ? "id" : "date", order]],
    });

    const updatedAttendances = attendances.map(calculateAttendance);
    const filteredAttendances = status
      ? updatedAttendances.filter((attendance) => attendance.status === status)
      : updatedAttendances;

    const workingDaysMap = filteredAttendances.reduce((acc, attendance) => {
      if (attendance?.checkIn) {
        const dateKey = attendance.userId + "-" + attendance.date;
        if (!acc[attendance.userId]) {
          acc[attendance.userId] = new Set();
        }
        acc[attendance.userId].add(dateKey);
      }
      return acc;
    }, {});

    const workingDaysCount = Object.fromEntries(
      Object.entries(workingDaysMap).map(([userId, datesSet]) => [
        userId,
        datesSet.size,
      ])
    );

    const attendanceResponse = formatAttendanceResponse(
      filteredAttendances,
      workingDaysCount
    );

    return this.successResponse(
      res,
      attendanceResponse,
      `Attendance for user with ID ${userId} retrieved successfully`
    );
  };

  updateAttendance = async (req, res) => {
    const { date } = req?.body;
    const userId = req?.user?.id;

    const validationResult = validateUpdateAttendance(req?.body);

    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const currentDate = new Date();
    const inputDate = new Date(date);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(currentDate.getDate() - 7);

    if (inputDate < sevenDaysAgo) {
      return this.errorResponse(res, "Date cannot be older than 7 days", 400);
    }

    const isUser = await UserRepo?.findById(userId);

    if (!isUser) {
      return this.errorResponse(res, `User with ID ${userId} not found`, 404);
    }

    const attendanceData = {
      ...req?.body,
      userId,
    };

    const [attendance] = await sequelize.query(
      `SELECT * FROM Attendances WHERE userId = :userId AND date = :date`,
      {
        replacements: { userId, date },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (!attendance) {
      const newAttendance = await AttendanceRepo?.createAttendance(
        attendanceData
      );

      return this.successResponse(
        res,
        newAttendance,
        "Attendance created successfully"
      );
    } else {
      const updatedAttendance = await AttendanceRepo?.updateAttendance(
        attendanceData,
        attendance?.id
      );
      return this.successResponse(
        res,
        updatedAttendance,
        `Attendance updated successfully`
      );
    }
  };
}

module.exports = new AttendanceController();
