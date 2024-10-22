const express = require("express");
const router = express.Router();
const AnnouncementController = require("../controllers/AnnouncementController.js");
<<<<<<< HEAD
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
=======
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
>>>>>>> 7d9a7b9de81358e8643d133ef1cc9c65e94a85c6

module.exports = router;
