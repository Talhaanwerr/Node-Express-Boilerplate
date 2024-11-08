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
const {
  authorize,
  authMiddleware,
} = require("../middlewares/auth.middleware.js");

router.post("/login", loginUser);
router.post("/change-password", authMiddleware, changePassword);
router.post("/forgot-password", forgetPassword);
router.post("/reset-password", resetPasswordWithToken);
router.post("/logout", authMiddleware, logoutUser);

module.exports = router;
