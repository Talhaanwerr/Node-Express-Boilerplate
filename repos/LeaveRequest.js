const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class LeaveRequestRepo extends BaseRepository {
  model;
  constructor() {
    super(db.LeaveRequest);
    this.model = db.LeaveRequest;
  }

  async createLeaveRequest(LeaveRequest) {
    return this.create(LeaveRequest);
  }

  async findLeave(id) {
    return this.findOne({ id });
  }

  async getLeaves(condition = {}) {
    return this.findAll(condition);
  }

  async findLeaveByUserId(userId) {
    return this.findOne({ userId });
  }

  async updateLeaveRequest(leaveRequest, id) {
    await this.update(leaveRequest, { id });
    return this.findOne({ id });
  }

  async isLeaveExists(leaveRequestId) {
    return this.count({ where: { id: leaveRequestId } });
  }

  async deleteLeave(id, type) {
    return this.delete(id, type);
  }
}

module.exports = new LeaveRequestRepo();
