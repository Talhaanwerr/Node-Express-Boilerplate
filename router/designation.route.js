// const express = require('express');
// const router = express.Router();

// const designationController = require("../controllers/DesignationController.js");

// router.post("/create-designation", designationController.createDesignation);
// router.patch("/update-designation/:id", designationController.updateDesignation);
// router.delete("/delete-designation/:id", designationController.deleteDesignation);

// module.exports = router;

const express = require('express');
const router = express.Router();

const DesignationController = require("../controllers/DesignationController.js");

// Route for creating a new designation
router.post("/create-designation", DesignationController.createDesignation);

// Route for updating an existing designation by ID
router.patch("/update-designation/:id", DesignationController.updateDesignation);

// Route for deleting a designation by ID
router.delete("/delete-designation/:id", DesignationController.deleteDesignation);

// Route for getting all designations
router.get("/get-all-designations", DesignationController.getAllDesignations);

// Route for getting a specific designation by ID
router.get("/get-designation/:id", DesignationController.getDesignationById);

module.exports = router;