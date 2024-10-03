const express = require("express");
const router = express.Router();

const designationController = require("../controllers/DesignationController.js");

router.post("/create-designation", designationController.create - designation);

module.exports = router;