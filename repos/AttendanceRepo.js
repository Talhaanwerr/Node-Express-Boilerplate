const BaseRepository = require("./BaseRepo");
const db = require("../models/index");
const { Op } = require("sequelize");

class AttendanceRepo extends BaseRepository {
  constructor() {
    super(db.Attendance);
    this.model = db.Attendance;
  }

  async findById(id) {
    return this.findOne({ id });
  }

  async findByIdAndDate({ userId, date }) {
    return this.findOneWithDateAndUserId({
      userId,
      date: {
        [Op.eq]: date,
      },
    });
  }

  async findByIdWithInclude(id) {
    return this.findOneWithInclude({
      where: { id },
      include: [
        {
          model: db.User,
          as: "user",
          attributes: ["firstName", "lastName"],
        },
      ],
    });
  }

  async createAttendance(attendance) {
    return this.create(attendance);
  }

  async updateAttendance(attendance, id) {
    await this.update(attendance, { id });
    return this.findOne({ id });
  }

  
  async getAttendance(options = {}) {
    return this.findAll({
      where: options.where || {},
      include: [
        {
          model: db.User,
          as: "user",
          attributes: ["firstName", "lastName"],
        },
      ],
      limit: options.limit,
      offset: options.offset,
      order: options.order, 
    });
  }
  

  async findAttendance(attendanceId) {
    return this.findOne({ attendanceId });
  }

  async findByUserId(userId) {
    return this.findAll({
      where: { userId },
      include: [
        {
          model: db.User,
          as: "user",
          attributes: ["firstName", "lastName"],
        },
      ],
    });
  }

  async isAttendanceExists(roleId) {
    return this.count({
      roleId,
    });
  }
}

module.exports = new AttendanceRepo();
