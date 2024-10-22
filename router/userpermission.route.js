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

// const express = require('express');
// const UserPermissionController = require('../controllers/UserPermissionController'); // Adjust the path as needed
// const router = express.Router();

// // Route to get all users with their permissions
// router.get('/user-permission/get-all-users', UserPermissionController.getUsersWithPermissions);

// // Route to assign permissions to a user
// router.post('/user-permission/assign', UserPermissionController.assignPermissions);

// // Route to get user permissions by user ID
// router.get('/user-permission/:userId', UserPermissionController.getUsersWithPermissionsById);

// // Route to update user permission
// router.put('/user-permission/:userId/:permissionId', UserPermissionController.updateUserPermission);

// // Export the router
// module.exports = router;