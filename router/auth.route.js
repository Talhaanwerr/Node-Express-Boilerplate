const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController.js");
const authorize = require("../middlewares/auth.middleware.js");

router.post("/login", AuthController.loginUser);
router.post(
  "/change-password",
  authorize("user"),
  AuthController.changePassword
);
router.post("/forgot-password", AuthController.forgetPassword);
router.post("/reset-password", AuthController.resetPasswordWithToken);
router.get("/verify-token", AuthController.verifyToken);
router.post("/logout", authorize("user"), AuthController.logoutUser);

module.exports = router;
