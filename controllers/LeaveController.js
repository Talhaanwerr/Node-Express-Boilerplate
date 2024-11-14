const LeaveRepo = require("../repos/LeaveRepo.js");
const LeaveRequestRepo = require("../repos/LeaveRequest.js");
const db = require("../models/index");
const {
  validateCreateLeave,
  validateUpdateLeave,
  validateCreateLeaveRequest,
} = require("../validators/LeaveValidator.js");
const BaseController = require("./BaseController.js");
const UserRepo = require("../repos/UserRepo.js");

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

    return this.successResponse(res, leaves, "Getting All Leaves");
  };

  createLeaveRequest = async (req, res) => {
    const validationResult = validateCreateLeaveRequest(req.body);

    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

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

  getAllLeaveRequest = async (req, res) => {
    const customQuery = {
      include: [
        {
          model: db.User,
          as: "user",
          attributes: ["id", "firstName", "lastName", "email"],
          include: [
            {
              model: db.Designation,
              as: "designation",
              attributes: ["id", "name"],
            },
            {
              model: db.Role,
              as: "role",
              attributes: ["id", "name"],
            },
          ],
        },
      ],
    };

    const leaveRequest = await LeaveRequestRepo.getLeaves(customQuery);

    return this.successResponse(
      res,
      leaveRequest,
      "Getting All Leave Requests"
    );
  };

  getLeaveRequestByReportingTo = async (req, res) => {
    const userId = req.user.id;

    const customQueryForUser = {
      where: {
        primaryReporting: userId,
      },
    };

    const users = await UserRepo.getUsers(customQueryForUser);

    const id = users.map((user) => user.id);

    const customQuery = {
      where: {
        userId: id,
        status: "pending",
      },
      include: [
        {
          model: db.User,
          as: "user",
          attributes: ["id", "firstName", "lastName", "email"],
          include: [
            {
              model: db.Designation,
              as: "designation",
              attributes: ["id", "name"],
            },
            {
              model: db.Role,
              as: "role",
              attributes: ["id", "name"],
            },
          ],
        },
      ],
    };

    const leaveRequest = await LeaveRequestRepo.getLeaves(customQuery);

    return this.successResponse(
      res,
      leaveRequest,
      "Getting All Leave Requests"
    );
  };

  leaveApproval = async (req, res) => {
    const id = req.user.id;
    const { userId, status } = req.body;

    const leaveRequest = await LeaveRequestRepo.findLeaveByUserId(userId);

    let { leaveType } = leaveRequest;

    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const days =
      (new Date(leaveRequest.endDate) - new Date(leaveRequest.startDate)) /
      millisecondsPerDay;

    if (status === "approved") {
      const leave = await LeaveRepo.findLeaveByUserId(userId);
      const remainingLeaves = leave.availableLeaves - days;
      const usedLeave = leave.usedLeaves + days;
      const customQuery = {
        typeOfLeave: leaveType,
        availableLeaves: remainingLeaves,
        usedLeaves: usedLeave,
      };
      if (remainingLeaves < 0) {
        return this.errorResponse(
          res,
          "You don't have enough leaves to apply",
          422
        );
      }
      await LeaveRepo.updateLeave(customQuery, leave.id);
    }

    const updatedLeaveRequest = await LeaveRequestRepo.updateLeaveRequest(
      { status, approverBy: id },
      leaveRequest.id
    );

    return this.successResponse(
      res,
      updatedLeaveRequest,
      "Leave Request Updated Successfully"
    );
  };
}

module.exports = new LeaveController();
