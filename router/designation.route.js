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

router.post("/create-designation", DesignationController.createDesignation);

router.patch(
  "/update-designation/:id",
  DesignationController.updateDesignation
);

router.delete(
  "/delete-designation/:id",
  DesignationController.deleteDesignation
);

router.get("/get-all-designations", DesignationController.getAllDesignations);

router.get("/get-designation/:id", DesignationController.getDesignationById);

module.exports = router;