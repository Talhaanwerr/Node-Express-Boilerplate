
const express = require("express");
const router = express.Router();
const RolePermissionController = require("../controllers/RolePermissionController.js");

router.get("/get-all", RolePermissionController.getRolesWithPermissions); 
router.get("/get-by-role/:roleId", RolePermissionController.getRolePermissions); 
router.post("/assign", RolePermissionController.assignPermissions);
router.delete("/delete", RolePermissionController.deleteRolePermission); 

module.exports = router;
