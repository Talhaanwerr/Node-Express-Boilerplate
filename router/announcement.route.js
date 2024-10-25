const express = require("express");
const router = express.Router();
const AnnouncementController = require("../controllers/AnnouncementController.js");
const { authorize } = require("../middlewares/auth.middleware.js");

router.post(
  "/create-announcement",
  // authorize("admin"),
  AnnouncementController.createAnnouncement
);
router.patch(
  "/update-announcement/:id",
  // authorize("admin"),
  AnnouncementController.updateAnnouncement
);
router.get("/get-announcements", AnnouncementController.getAnnouncement);
router.get(
  "/getAnnouncementsById/:id",
  AnnouncementController.getAnnouncementById
);

module.exports = router;
