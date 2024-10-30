const LeaveRepo = require('../repos/LeaveRepo');
const { validateCreateLeave, validateUpdateLeave } = require('../validators/LeaveValidator');
const BaseController = require('./BaseController');

class LeaveController extends BaseController {
  getLeaveById = async (req, res) => {
    const { id } = req.params;
    const leave = await LeaveRepo.findById(id);

    if (!leave) {
      return this.errorResponse(res, "Leave ID not found", 404);
    }
    return this.successResponse(res, leave, "Leave retrieved successfully");
  };

  getAllLeaves = async (req, res) => {
    const leaves = await LeaveRepo.getLeaves({});
    return this.successResponse(res, leaves, "Leaves retrieved successfully");
  };

  createLeave = async (req, res) => {
    const validationResult = validateCreateLeave(req.body);
    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }
    const leave = await LeaveRepo.createLeave(req.body);
    return this.successResponse(res, leave, "Leave created successfully");
  };

  updateLeave = async (req, res) => {
    const { id } = req.params;
    const validationResult = validateUpdateLeave(req.body);
    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }
    const leave = await LeaveRepo.updateLeave(id, req.body);
    return this.successResponse(res, leave, "Leave updated successfully");
  };

  deleteLeave = async (req, res) => {
    const { id } = req.params;
    const { type } = req.query;
    const leave = await LeaveRepo.deleteLeave(id, type);
    return this.successResponse(res, leave, `Leave with ID ${id} deleted successfully`);
  };
}

module.exports = new LeaveController();
