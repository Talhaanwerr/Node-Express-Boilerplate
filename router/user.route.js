const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController.js");

router.get("/", UserController.saveUser);

module.exports = router;
