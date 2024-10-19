// repos/AttendanceRepo.js
const db = require("../models/index.js"); // Assuming Sequelize models are defined in this directory

class AttendanceRepo {
    findById = async(id) => {
        return await db.Attendance.findOne({ where: { id } });
    };

    createAttendance = async(attendanceData) => {
        return await db.Attendance.create(attendanceData);
    };

    updateAttendance = async(id, attendanceData) => {
        await db.Attendance.update(attendanceData, { where: { id } });
        return this.findById(id); // Return the updated record
    };

    deleteAttendance = async(id) => {
        await db.Attendance.update({ isDeleted: true }, { where: { id } });
    };
}

module.exports = new AttendanceRepo();