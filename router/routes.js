const express = require("express");
const router = express.Router();
const announcementRoutes = require("./announcement.route.js");
const roleRoutes = require("./role.route.js");

router.use("/announcements", announcementRoutes);
router.use("/role", roleRoutes);

module.exports = router;
