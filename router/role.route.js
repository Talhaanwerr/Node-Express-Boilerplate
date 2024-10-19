const express = require("express");
const router = express.Router();

const RoleController = require("../controllers/RoleController.js");
const authorize = require("../middlewares/auth.middleware.js");

router.post(
  "/create-role",
  //  authorize("Admin"),
  RoleController.createRole
);
router.patch(
  "/update-role/:id",
  // authorize("admin"),
  RoleController.updateRole
);
router.delete(
  "/delete-role/:id",
  // authorize("admin"),
  RoleController.deleteRole
);
router.get("/get-all-roles", authorize("admin"), RoleController.getRoles);
router.get(
  "/get-role-by-id/:id",
  // authorize("admin"),
  RoleController.getRoleById
);

module.exports = router;
