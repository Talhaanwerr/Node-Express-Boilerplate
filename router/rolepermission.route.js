const express = require("express");
const router = express.Router();

const RolePermissionController = require("../controllers/RolePermissionController.js");
const authorize = require("../middlewares/auth.middleware.js");
 
router.get(
  "/get-all-roles-with-permissions",
  // authorize("admin"),
  RolePermissionController.getRolesWithPermissions
);
router.get(
  "/get-permissions-by-role/:roleId",
  // authorize("admin"),
  RolePermissionController.getRolesWithPermissionsById
);
router.post(
  "/assign-permissions",
  // authorize("admin"),
  RolePermissionController.assignPermissions
);
router.patch(
  "/update-permissions/:roleId/:permissionId",
  // authorize("admin"),
  RolePermissionController.updateRolePermission
);

module.exports = router;