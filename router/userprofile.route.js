const express = require("express");
const router = express.Router();
const UserProfileController = require("../controllers/UserProfileController.js");

router.get("/get-all-user-profiles", UserProfileController.getAllUserProfiles);
router.get("/get-user-profile/:id", UserProfileController.getUserProfileById);
router.post("/create-user-profile", UserProfileController.createUserProfile);
router.patch(
  "/update-user-profile/:id",
  UserProfileController.updateUserProfile
);
router.delete(
  "/delete-user-profile/:id",
  UserProfileController.deleteUserProfile
);

module.exports = router;
