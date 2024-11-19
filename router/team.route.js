const express = require("express");
const router = express.Router();

const TeamController = require("../controllers/TeamController.js");
const authorize = require("../middlewares/auth.middleware.js");

router.get(
  "/get-team",
  // authorize("admin"),
  TeamController.getTeam
);

module.exports = router;
