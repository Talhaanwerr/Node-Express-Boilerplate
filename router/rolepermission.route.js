const express = require("express");
const router = express.Router();

const RolePermissionController = require("../controllers/RolePermissionController.js");
const { create } = require("../repos/AnnouncementRepo.js");
const AnnouncementRepo = require("../repos/AnnouncementRepo.js");

// router.get("/get-all-roles", RolePermissionController.getRolesWithPermissions); 
router.post("/assign-permission-to-role", RolePermissionController.assignPermissions); // change controller name

router.get("/get-permissions-by-role/:roleId", RolePermissionController.getRolesWithPermissionsById);  // change controller name


router.patch("/update/:roleId/:permissionId", RolePermissionController.updateRolePermission);



module.exports = router;

1,1
1,3
1,4
1,5
1,6
1,7


1
const permissions = [1,2,3,4,5,6,7]

// User
// 1) create-user   2)Update-user

// Role
// 1) create   2)Update

// Announcement


// seeder for permissions -> 
// User, create-user
// Role, create-role 