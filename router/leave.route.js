const express = require("express");
const router = express.Router();
const LeaveController = require("../controllers/LeaveController.js");
const {
  authorize,
  authMiddleware,
} = require("../middlewares/auth.middleware.js");

router.post(
  "/create-leave",
  // authorize("admin"),
  LeaveController.createLeaveRequest
);
// router.patch(
//   "/update-announcement/:id",
//   // authorize("admin"),
//   AnnouncementController.updateAnnouncement
// );
router.get("/get-leave", LeaveController.getLeaves);
// router.get(
//   "/getAnnouncementsById/:id",
//   AnnouncementController.getAnnouncementById
// );
// router.get("/get-birthday", authMiddleware, AnnouncementController.getBirthday);

module.exports = router;
