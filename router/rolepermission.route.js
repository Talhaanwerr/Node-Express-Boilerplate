const express = require("express");
const router = express.Router();

const RolePermissionController = require("../controllers/RolePermissionController.js");

router.get("/get-all-roles", RolePermissionController.getRolesWithPermissions); 
router.get("/get-by-role/:roleId", RolePermissionController.getRolesWithPermissionsById); 
router.post("/assign", RolePermissionController.assignPermissions);
router.patch("/update/:roleId/:permissionId", RolePermissionController.updateRolePermission); 

module.exports = router;