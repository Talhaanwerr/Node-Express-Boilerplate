const LeaveRepo = require("../repos/LeaveRepo.js");
const LeaveRequestRepo = require("../repos/LeaveRequest.js");
const db = require("../models/index");
const {
  validateCreateLeave,
  validateUpdateLeave,
  validateCreateLeaveRequest,
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
    const validateResult = validateCreateLeaveRequest(req.body);

    const userId = req.user.id;
    const { leaveYear = new Date().getFullYear() } = req.body;

    const leaveRequest = await LeaveRequestRepo?.createLeaveRequest({
      userId,
      leaveYear,
      ...req.body,
    });

    console.log("leaveRequest", leaveRequest);

    return this.successResponse(
      res,
      leaveRequest,
      "Leave Request Submitted Successfully"
    );
  };
}
module.exports = new LeaveController();
