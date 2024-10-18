const express = require("express");
const router = express.Router();
const PermissionController = require("../controllers/PermissionController.js");
const authorize = require("../middlewares/auth.middleware.js");

router.get(
  "/get-all-permissions",
  authorize("admin"),
  PermissionController.getAllPermission
);
router.get(
  "/get-permission/:id",
  authorize("admin"),
  PermissionController.getPermissionById
);
router.post(
  "/create-permission",
  authorize("admin"),
  PermissionController.createPermission
);
router.patch(
  "/update-permission/:id",
  authorize("admin"),
  PermissionController.updatePermission
); // patch
router.delete(
  "/delete-permission/:id",
  authorize("admin"),
  PermissionController.deletePermission
);
// get one permission

module.exports = router;