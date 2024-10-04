const express = require('express');
const router = express.Router();

const designationController = require("../controllers/DesignationController.js");

router.post("/create-designation", designationController.createDesignation);
router.patch("/update-designation/:id", designationController.updateDesignation);
router.delete("/delete-designation/:id", designationController.deleteDesignation);

module.exports = router;