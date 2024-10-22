const BaseRepository = require("./BaseRepo");
const db = require("../models/index");

class AttendanceRepo extends BaseRepository {
  constructor() {
    super(db.Attendance);
    this.model = db.Attendance;
  }

  async findById(id) {
    return this.findOne({ id });
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

  async getAttendance(condition = {}) {
    return this.findAll({
      where: condition,
      include: [
        {
          model: db.User,
          as: "user",
          attributes: ["firstName", "lastName"],
        },
      ],
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
