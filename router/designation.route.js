const express = require('express');
const router = express.Router();
const authorize = require("../middlewares/auth.middleware.js");

const DesignationController = require("../controllers/DesignationController.js");

router.post("/create-designation", DesignationController.createDesignation);

router.patch(
  "/update-designation/:id",
  // authorize("admin"),
  DesignationController.updateDesignation
);

router.delete(
  "/delete-designation/:id",
  // authorize("admin"),
  DesignationController.deleteDesignation
);

router.get(
  "/get-all-designations",
  // authorize("admin"),
  DesignationController.getAllDesignations
);

router.get(
  "/get-designation/:id",
  // authorize("admin"),
  DesignationController.getDesignationById
);

module.exports = router;