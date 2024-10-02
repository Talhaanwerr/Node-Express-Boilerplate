const express = require("express");
const router = express.Router();
const AnnouncementController = require("../controllers/AnnouncementController.js");

router.post("/create-announcement", AnnouncementController.createAnnouncement);

module.exports = router;
