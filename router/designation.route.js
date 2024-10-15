// const express = require('express');
// const router = express.Router();

// const designationController = require("../controllers/DesignationController.js");

// router.post("/create-designation", designationController.createDesignation);
// router.patch("/update-designation/:id", designationController.updateDesignation);
// router.delete("/delete-designation/:id", designationController.deleteDesignation);

// module.exports = router;

const express = require('express');
const router = express.Router();
<<<<<<< HEAD
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
=======

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
>>>>>>> 14038611f552d5a12ec5c5ed9451dbddbf9720ee

module.exports = router;