const express = require("express");
const router = express.Router();
const announcementRoutes = require("./announcement.route.js");
const permissionRoutes = require("./permission.route.js");

router.use("/announcements", announcementRoutes);
router.use("/permissions", permissionRoutes);

module.exports = router;
