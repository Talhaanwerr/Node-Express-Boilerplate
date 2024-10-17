const express = require("express");
const router = express.Router();
const announcementRoutes = require("./announcement.route.js");
const designationRoute = require("./designation.route.js");
const permissionRoute = require('./permission.route.js');
const userPermissionRoute = require('./userpermission.route.js');


router.use("/announcements", announcementRoutes);
router.use("/designation", designationRoute);
router.use("/permissions", permissionRoute);
router.use("/user-permission", userPermissionRoute);

module.exports = router;