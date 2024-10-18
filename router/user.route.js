const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController.js");

router.get("/get-user/:id", UserController.getUserById);
router.get("/get-all-users", UserController.getAllUsers);
router.post("/create-user-with-profile", UserController.createUserWithProfile);
router.post("/create-user", UserController.createUser);
router.patch("/update-user/:id", UserController.updateUser);
router.delete("/delete-user/:id", UserController.deleteUser);

module.exports = router;
