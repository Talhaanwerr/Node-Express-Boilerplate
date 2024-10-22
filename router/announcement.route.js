const express = require("express");
const router = express.Router();
const AnnouncementController = require("../controllers/AnnouncementController.js");
const { route } = require("express/lib/router/index.js");

router.post("/create-announcement", AnnouncementController.createAnnouncement);
router.patch(
  "/update-announcement/:id",
  AnnouncementController.updateAnnouncement
);
router.get("/get-announcements", AnnouncementController.getAnnouncement);
router.get(
  "/getAnnouncementsById/:id",
  AnnouncementController.getAnnouncementById
);
router.delete(
  "/delete-announcements/:id",
  AnnouncementController.deleteAnnouncement
);

module.exports = router;
