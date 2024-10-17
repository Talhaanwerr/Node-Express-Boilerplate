const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController.js");

router.post("/login", AuthController.loginUser);
router.post("/reset-password", AuthController.resetPassword);
router.post("/forgot-password", AuthController.forgetPassword);
router.post("/verify-token", AuthController.verifyToken);

module.exports = router;
