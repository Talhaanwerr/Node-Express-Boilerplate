const express = require("express");
const router = express.Router();

const RoleController = require("../controllers/RoleController.js");

router.post("/create-role", RoleController.createRole);
router.patch("/update/:id",RoleController.updateRole);
router.delete("/delete/:id",RoleController.deleteRole);
router.get("/get-all-roles",RoleController.getRoles)
router.get("/get-role-by-id/:id",RoleController.getRoleById)

module.exports = router;
