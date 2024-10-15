const express = require("express");
const router = express.Router();
const UserPermissionController = require("../controllers/UserPermissionController");

router.post("/user-permissions/assign", UserPermissionController.assignPermissions);
router.get("/user-permissions", UserPermissionController.getUsersWithPermissions);
router.get("/user-permissions/:userId", UserPermissionController.getUserPermissionsById);
router.put("/user-permissions/update/:userId/:permissionId", UserPermissionController.updateUserPermission);

module.exports = router;