const express = require("express");
const router = express.Router();
const announcementRoutes = require("./announcement.route.js");
const designationRoute = require("./designation.route.js");
const roleRoutes = require("./role.route.js");
const permissionRoutes = require("./permission.route.js");
const RolePermissionRoutes = require("./rolepermission.route.js");

router.use("/announcements", announcementRoutes);
router.use("/roles", roleRoutes);
router.use("/permissions", permissionRoutes);
router.use("/rolepermission", RolePermissionRoutes);

router.use("/designation", designationRoute);
module.exports = router;
