const express = require("express");
const router = express.Router();
const announcementRoutes = require("./announcement.route.js");

router.use("/announcements", announcementRoutes);

module.exports = router;
