const express = require("express");
const router = express.Router();
const announcementRoutes = require("./announcement.route.js");
const roleRoutes = require("./role.route.js");
const permissionRoutes = require("./permission.route.js");

router.use("/announcements", announcementRoutes);
router.use("/roles", roleRoutes);
router.use("/permissions", permissionRoutes);


module.exports = router;
