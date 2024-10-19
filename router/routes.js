// const express = require("express");
// const router = express.Router();
// const announcementRoutes = require("./announcement.route.js");
// const designationRoute = require("./designation.route.js");
// const roleRoutes = require("./role.route.js");
// const permissionRoutes = require("./permission.route.js");
// const RolePermissionRoutes = require("./rolepermission.route.js");
// const userRoutes = require("./user.route.js");
// const userProfileRoutes = require("./userprofile.route.js");
// const authRoutes = require("./auth.route.js");

// router.use("/announcements", announcementRoutes);
// router.use("/roles", roleRoutes);
// router.use("/permissions", permissionRoutes);
// router.use("/rolepermission", RolePermissionRoutes);
// router.use("/users", userRoutes);
// router.use("/user-profiles", userProfileRoutes);
// router.use("/designation", designationRoute);
// router.use("/auth", authRoutes);

// module.exports = router;

const express = require("express");
const router = express.Router();
const announcementRoutes = require("./announcement.route");
const designationRoutes = require("./designation.route");
const roleRoutes = require("./role.route");
const permissionRoutes = require("./permission.route");
const rolePermissionRoutes = require("./rolepermission.route");
const userRoutes = require("./user.route");
const userProfileRoutes = require("./userprofile.route");
const authRoutes = require("./auth.route");

router.use("/announcements", announcementRoutes);
router.use("/roles", roleRoutes);
router.use("/permissions", permissionRoutes);
router.use("/rolepermission", rolePermissionRoutes);
router.use("/users", userRoutes);
router.use("/user-profiles", userProfileRoutes);
router.use("/designation", designationRoutes); // Ensure this is correct
router.use("/auth", authRoutes);

module.exports = router;