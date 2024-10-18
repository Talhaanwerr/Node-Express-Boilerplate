const express = require("express");
const router = express.Router();
const PermissionController = require("../controllers/PermissionController.js");

router.get("/get-all-permissions", PermissionController.getAllPermission);
router.get("/get-permission/:id", PermissionController.getPermissionById);
router.post("/create-permission", PermissionController.createPermission);
router.patch("/update-permission/:id", PermissionController.updatePermission); // patch
router.delete("/delete-permission/:id", PermissionController.deletePermission);
// get one permission

module.exports = router;