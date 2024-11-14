const express = require("express");
const router = express.Router();
const LeaveController = require("../controllers/LeaveController.js");
const {
  authorize,
  authMiddleware,
} = require("../middlewares/auth.middleware.js");

router.post(
  "/create-leave-request",
  // authorize("admin"),
  LeaveController.createLeaveRequest
);
router.get("/get-leave", LeaveController.getLeaves);
router.get("/get-all-leave-request", LeaveController.getAllLeaveRequest);
router.get(
  "/get-leave-request-by-reportingTo",
  LeaveController.getLeaveRequestByReportingTo
);
router.patch("/update-leave-request", LeaveController.leaveApproval);

module.exports = router;