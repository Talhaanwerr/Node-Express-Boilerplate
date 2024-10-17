const express = require("express");
const router = express.Router();

const RoleController = require("../controllers/RoleController.js");
const authorize = require("../middlewares/auth.middleware.js");

router.post("/create-role", authorize("Admin"), RoleController.createRole);
router.patch("/update/:id", RoleController.updateRole);
router.delete("/delete/:id", RoleController.deleteRole);
router.get("/get-all-roles", RoleController.getRoles);
router.get("/get-role-by-id/:id", RoleController.getRoleById);

module.exports = router;
