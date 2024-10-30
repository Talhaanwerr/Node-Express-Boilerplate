const HolidayRepo = require("../repos/HolidayRepo.js");
const db = require("../models/index");
const { validateCreateHoliday, validateUpdateHoliday } = require("../validators/RoleValidator.js");
const BaseController = require("./BaseController.js");

class HolidayController extends BaseController {
  constructor() {
    super();
  }

  
}
module.exports = new RoleController();



