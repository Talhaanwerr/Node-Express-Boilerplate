const express = require("express");
const AttendanceController = require("../controllers/Attendance-by-id-Controller");

const router = express.Router();
router.get("/get-all-attendances", AttendanceController.getAllAttendances);
router.get("/get-attendance/:id", AttendanceController.getAttendanceById);
router.post("/create-attendance", AttendanceController.createAttendance);
router.patch("/update-attendance/:id", AttendanceController.updateAttendance);
router.delete("/delete-attendance/:id", AttendanceController.deleteAttendance); // Soft delete attendance record

module.exports = router;