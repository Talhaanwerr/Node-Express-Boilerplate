const HolidayRepo = require("../repos/HolidayRepo.js");
const db = require("../models/index");
const {
  validateCreateHoliday,
  validateUpdateHoliday,
} = require("../validators/HolidayValidator.js");
const BaseController = require("./BaseController.js");

class HolidayController extends BaseController {
  constructor() {
    super();
  }

  createHoliday = async (req, res) => {
    const validationResult = validateCreateHoliday(req.body);

    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const holiday = await HolidayRepo.createHoliday(req.body);

    if (!holiday) {
      return this.errorResponse(res, "Unable to create holiday", 500);
    }

    return this.successResponse(res, holiday, "Holiday created successfully");
  };

  getAllHolidays = async (req, res) => {
    const holidays = await HolidayRepo.getAllHolidays();

    if (!holidays) {
      return this.errorResponse(res, "Holidays not found", 404);
    }

    return this.successResponse(
      res,
      holidays,
      "Holidays retrieved successfully"
    );
  };

  updateHoliday = async (req, res) => {
    const validationResult = validateUpdateHoliday(req.body);

    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const holiday = await HolidayRepo.updateHoliday(req.body, req.params.id);

    if (!holiday) {
      return this.errorResponse(res, "Unable to update holiday", 500);
    }

    return this.successResponse(res, holiday, "Holiday updated successfully");
  };
}

module.exports = new HolidayController();