const express = require("express");
const router = express.Router();
const AttendanceController = require("../controllers/AttendanceController.js");
const { authorize } = require("../middlewares/auth.middleware.js");

router.post("/manage-attendance", AttendanceController.manageAttendance);
router.get(
  "/get-all-attendances",
  authorize("Super Admin"),
  AttendanceController.getAllAttendances
);
router.get("/get-attendance-by-id/:id", AttendanceController.getAttendanceById);
router.get(
  "/get-attendance-dashboard",
  AttendanceController.getAllAttendancesDashboard
);

router.get(
  "/get-attendance-by-user/:userId?",
  AttendanceController.getAttendanceByUserId
);
router.patch("/update-attendance", AttendanceController.updateAttendance);

module.exports = router;
