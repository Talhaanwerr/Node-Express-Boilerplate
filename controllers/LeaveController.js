const LeaveRepo = require("../repos/LeaveRepo.js");
const db = require("../models/index");
const {
  validateCreateLeave,
  validateUpdateLeave,
} = require("../validators/LeaveValidator.js");
const BaseController = require("./BaseController.js");

class LeaveController extends BaseController {
  // constructor() {
  //   super();
  // }

  getLeaves = async (req, res) => {
    const userId = req.user.id;

    const customQuery = {
      where: {
        userId,
      },
    };

    const leaves = await LeaveRepo?.getLeaves(customQuery);

    if (!leaves) {
      return this.errorResponse(res, "No Leaves Found", 404);
    }

    return this.successResponse(res, leaves, "Getting All Leaves");
  };

  createLeaveRequest = async (req, res) => {
    const { userId } = req.user.id;
    const { leaveType, startDate, endDate, reason } = req.body;

    return this.successResponse(res, leave, "Leave Created Successfully");
  };
}
module.exports = new LeaveController();
