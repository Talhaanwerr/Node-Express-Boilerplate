
const express = require('express');
const router = express.Router();
const authorize = require("../middlewares/auth.middleware.js");

const DesignationController = require("../controllers/DesignationController.js");

router.post("/create-designation", DesignationController.createDesignation);

router.patch(
  "/update-designation/:id",
  DesignationController.updateDesignation
);

router.delete(
  "/delete-designation/:id",
  DesignationController.deleteDesignation
);

router.get(
  "/get-all-designations",
  DesignationController.getAllDesignations
);

router.get(
  "/get-designation/:id",
  DesignationController.getDesignationById
);

module.exports = router;