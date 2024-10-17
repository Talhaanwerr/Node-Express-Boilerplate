const express = require("express");
const router = express.Router();

const UserPermissionController = require("../controllers/UserPermissionController.js");

router.get("/get-all-users", UserPermissionController.getUsersWithPermissions);
router.get(
    "/get-permissions-by-user/:userId",
    UserPermissionController.getUsersWithPermissionsById
);
router.post("/assign", UserPermissionController.assignPermissions);
router.patch(
    "/update/:userId/:permissionId",
    UserPermissionController.updateUserPermission
);

module.exports = router;