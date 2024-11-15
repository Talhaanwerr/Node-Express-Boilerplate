const LeaveRepo = require("../repos/LeaveRepo.js");
const LeaveRequestRepo = require("../repos/LeaveRequest.js");
const db = require("../models/index");
const { Op } = require("sequelize");
const {
  validateUpdateLeaveRequest,
  validateCreateLeaveRequest,
} = require("../validators/LeaveValidator.js");
const BaseController = require("./BaseController.js");
const UserRepo = require("../repos/UserRepo.js");
const calculateDaysBetweenDates = require("../utils/dateUtils.js");

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
    const { year = new Date().getFullYear(), leavePeriod = "Full day" } =
      req.body;

    const leaveRequest = await LeaveRequestRepo?.createLeaveRequest({
      userId,
      year,
      leavePeriod,
      ...req.body,
    });

    return this.successResponse(
      res,
      leaveRequest,
      "Leave Request Submitted Successfully"
    );
  };

  getLeaveRequestByReportingTo = async (req, res) => {
    const userId = req.user.id;
    const isSuperAdmin = req?.user?.role.name === "Super Admin";
    let customQueryNew = null;
    let userIdsNew = [];

    if (isSuperAdmin) {
      customQueryNew = {
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
    } else {
      customQueryNew = {
        where: {
          [Op.or]: [
            { primaryReporting: userId },
            { secondaryReporting: userId },
          ],
        },
      };
      const users = await UserRepo.getUsers(customQueryNew);
      userIdsNew = users.map((user) => user.id);
      customQueryNew.where = {
        userId: userIdsNew,
      };
    }

    let leaveRequests = await LeaveRequestRepo.getLeaves(customQueryNew);

    leaveRequests = leaveRequests.map((leave) => ({
      ...leave.dataValues,
      days: calculateDaysBetweenDates(leave.startDate, leave.endDate),
    }));

    return this.successResponse(
      res,
      leaveRequests,
      "Getting All Leave Requests"
    );
  };

  getLeaveByUserId = async (req, res) => {
    const userId = req.user.id;

    const customQuery = {
      where: {
        userId,
      },
    };

    const leaves = await LeaveRequestRepo?.getLeaves(customQuery);

    return this.successResponse(
      res,
      leaves,
      `Getting All Leaves for user ${userId}`
    );
  };

  leaveApproval = async (req, res) => {
    const id = req.user.id;
    const { userId, status } = req.body;

    const leaveRequest = await LeaveRequestRepo.findLeaveByUserId(userId);

    let { leaveType } = leaveRequest;

    const days = calculateDaysBetweenDates(
      leaveRequest.startDate,
      leaveRequest.endDate
    );

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

  updateLeaveRequest = async (req, res) => {
    const validationResult = validateUpdateLeaveRequest(req.body);

    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const { id } = req.body;

    const updatedLeaveRequest = await LeaveRequestRepo.updateLeaveRequest(
      req.body,
      id
    );

    return this.successResponse(
      res,
      updatedLeaveRequest,
      "Leave Request Updated Successfully"
    );
  };

  deleteLeaveRequest = async (req, res) => {
    const { id } = req.body;

    await LeaveRequestRepo.deleteLeave(id);

    return this.successResponse(res, {}, "Leave Request Deleted Successfully");
  };
}

module.exports = new LeaveController();
