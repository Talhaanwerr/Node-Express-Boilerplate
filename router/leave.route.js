const express = require("express");
const router = express.Router();
const LeaveController = require("../controllers/LeaveController.js");


router.get("/get-all-leaves", LeaveController.getAllLeaves);

router.get("/get-leave/:id", LeaveController.getLeaveById);


router.post("/create-leave", LeaveController.createLeave);

router.patch("/update-leave/:id", LeaveController.updateLeave);


router.delete("/delete-leave/:id", LeaveController.deleteLeave);

module.exports = router;
