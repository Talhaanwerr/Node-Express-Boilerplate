const express = require("express");
const router = express.Router();
const {
  loginUser,
  changePassword,
  forgetPassword,
  resetPasswordWithToken,
  logoutUser,
  verifyToken,
} = require("../controllers/authController.js");
const authorize = require("../middlewares/auth.middleware.js");

router.post("/login", loginUser);
router.post("/change-password", changePassword);
router.post("/forgot-password", forgetPassword);
router.post("/reset-password", resetPasswordWithToken);
// router.get("/verify-token", verifyToken);
router.post("/logout", logoutUser);

module.exports = router;
