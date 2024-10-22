const express = require("express");
const router = express.Router();
const AttendanceController = require("../controllers/AttendanceController.js");
const {
  // authorize,
  authMiddleware,
} = require("../middlewares/auth.middleware.js");

router.post(
  "/manage-attendance/:id?",
  authMiddleware,
  AttendanceController.manageAttendance
);
router.get("/get-all-attendances", AttendanceController.getAllAttendances);
router.get("/get-attendance-by-id/:id", AttendanceController.getAttendanceById);
router.get(
  "/get-attendance-by-user/:userId",
  AttendanceController.getAttendanceByUserId
);
// router.post(
//   "/create-attendance",
//   authMiddleware,
//   AttendanceController.createAttendance
// );

module.exports = router;
