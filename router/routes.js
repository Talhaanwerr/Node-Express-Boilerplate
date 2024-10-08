const express = require("express");
const router = express.Router();
const announcementRoutes = require("./announcement.route.js");
const designationRoute = require("./designation.route.js")

router.use("/announcements", announcementRoutes);
router.use("/designation", designationRoute);
router.use("/permissions", permissionRoute);

module.exports = router;