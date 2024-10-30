const express = require("express");
const router = express.Router();

const HolidayController = require("../controllers/HolidayController.js");
const { authorize } = require("../middlewares/auth.middleware.js");

router.post(
  "/create-holiday",
  //  authorize("Admin"),
  HolidayController.createHoliday
);
router.patch(
  "/update-holiday/:id",
  // authorize("admin"),
  HolidayController.updateHoliday
);
router.delete(
  "/delete-holiday/:id",
  // authorize("admin"),
  HolidayController.deleteHoliday
);
router.get("/get-all-holidays", HolidayController.getHolidays);
router.get(
  "/get-holiday-by-id/:id",
  // authorize("admin"),
  HolidayController.getHolidayById
);

module.exports = router;
