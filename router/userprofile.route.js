const express = require("express");
const router = express.Router();
const UserProfileController = require("../controllers/UserProfileController.js");
const {
  authorize,
  authMiddleware,
} = require("../middlewares/auth.middleware.js");

router.get(
  "/get-all-user-profiles",
  // authorize("admin"),
  UserProfileController.getAllUserProfiles
);
router.get(
  "/get-user-profile",
  authMiddleware,
  UserProfileController.getUserProfileById
);
router.post(
  "/create-user-profile",
  // authorize("admin"),
  UserProfileController.createUserProfile
);
router.patch(
  "/update-user-profile/:id",
  // authorize("user"),
  UserProfileController.updateUserProfile
);
router.delete(
  "/delete-user-profile/:id",
  // authorize("admin"),
  UserProfileController.deleteUserProfile
);

module.exports = router;
