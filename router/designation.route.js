// const express = require('express');
// const router = express.Router();

// const designationController = require("../controllers/DesignationController.js");

// router.post("/create-designation", designationController.createDesignation);
// router.patch("/update-designation/:id", designationController.updateDesignation);
// router.delete("/delete-designation/:id", designationController.deleteDesignation);

// module.exports = router;

const express = require('express');
const router = express.Router();
const designationController = require("../controllers/DesignationController.js");

// Create a new designation
router.post("/", designationController.createDesignation); // Use a more standard route

// Update designation by ID
router.patch("/:id", designationController.updateDesignation); // Removed 'update-designation' for cleaner routes

// Delete designation by ID
router.delete("/:id", designationController.deleteDesignation); // Removed 'delete-designation' for cleaner routes

// Get all designations
router.get("/", designationController.getAllDesignations); // Added route to get all designations

// Get designation by ID
router.get("/:id", designationController.getDesignationById); // Added route to get a designation by ID

module.exports = router;