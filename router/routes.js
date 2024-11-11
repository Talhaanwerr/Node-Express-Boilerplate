const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/auth.middleware.js");
const announcementRoutes = require("./announcement.route.js");
const designationRoute = require("./designation.route.js");
const roleRoutes = require("./role.route.js");
const permissionRoutes = require("./permission.route.js");
const RolePermissionRoutes = require("./rolepermission.route.js");
const userRoutes = require("./user.route.js");
const userProfileRoutes = require("./userprofile.route.js");
const authRoutes = require("./auth.route.js");
const attendanceRoutes = require("./attendance.route.js");
const holidayRoutes = require("./holiday.route.js");
const leaveRoutes = require("./leave.route.js");

router.use("/announcements",authMiddleware, announcementRoutes);
router.use("/roles", authMiddleware, roleRoutes);
router.use("/permissions", authMiddleware, permissionRoutes);
router.use("/rolepermission", authMiddleware, RolePermissionRoutes);
router.use("/users",authMiddleware, userRoutes);
router.use("/user-profiles", authMiddleware, userProfileRoutes);
router.use("/designation", authMiddleware, designationRoute);
router.use("/auth", authRoutes);
router.use("/attendance", authMiddleware, attendanceRoutes);
router.use("/holiday", authMiddleware, holidayRoutes);
router.use("/leave", authMiddleware, leaveRoutes);
 
module.exports = router;