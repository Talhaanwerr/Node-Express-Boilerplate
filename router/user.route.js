const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController.js");
const {
  authorize,
  authMiddleware,
} = require("../middlewares/auth.middleware.js");

<<<<<<< HEAD
router.get("/get-user/:id",
  //  authorize("admin"),
 UserController.getUserById);
router.get("/get-all-users",
  //  authorize("admin"), 
   UserController.getAllUsers);
=======
router.get(
  "/get-user",
  // authorize("admin"),
  authMiddleware,
  UserController.getUserById
);
router.get("/get-all-users", authorize("admin"), UserController.getAllUsers);
>>>>>>> a86bc5f243dccae7030bce510a71b7e6f563fe4d
router.post(
  "/create-user-with-profile",
  // authorize("admin"),
  UserController.createUserWithProfile
);
router.post("/create-user", UserController.createUser);
router.patch(
  "/update-user/:id",
  // authorize("admin"),
  UserController.updateUser
);
router.delete(
  "/delete-user/:id",
  // authorize("admin"),
  UserController.deleteUser
);

module.exports = router;
