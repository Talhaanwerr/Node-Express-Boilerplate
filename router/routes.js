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
// router.use("/designations", designationRoute);
// router.use("/auth", authRoutes);

// module.exports = router;


const express = require("express");
const router = express.Router();
const announcementRoutes = require("./announcement.route.js");
const designationRoute = require("./designation.route.js");
const roleRoutes = require("./role.route.js");
const permissionRoutes = require("./permission.route.js");
const RolePermissionRoutes = require("./rolepermission.route.js");
const userRoutes = require("./user.route.js");
const userProfileRoutes = require("./userprofile.route.js");
const authRoutes = require("./auth.route.js");
const timeSummaryRoutes = require("./timesmmary.route.js"); 

router.use("/announcements", announcementRoutes);
router.use("/roles", roleRoutes);
router.use("/permissions", permissionRoutes);
router.use("/rolepermission", RolePermissionRoutes);
router.use("/users", userRoutes);
router.use("/user-profiles", userProfileRoutes);
router.use("/designations", designationRoute);
router.use("/auth", authRoutes);
router.use("/employees", timeSummaryRoutes); 

module.exports = router;
