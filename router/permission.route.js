const express = require("express");
const router = express.Router();
const PermissionController = require("../controllers/PermissionController.js");

router.get("/get-all-permssions", PermissionController.getAllPermission);
router.post("/create-permission", PermissionController.createPermission);
router.put("/update-permission/:id", PermissionController.updatePermission);
router.delete("/delete-permission/:id", PermissionController.deletePermission);

module.exports = router;
