const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class LeaveRepo extends BaseRepository {
  model;
  constructor() {
    super(db.Leave);
    this.model = db.Leave;
  }

  async createLeave(leave) {
    return this.create(leave);
  }

  async findLeave(id) {
    return this.findOne({ id });
  }

  async findLeaveByUserId(userId) {
    return this.findOne({ userId });
  }

  async getLeaves(condition = {}) {
    return this.findAll(condition);
  }

  async updateLeave(leave, id) {
    await this.update(leave, { id });
    return this.findOne({ id });
  }

  async isLeaveExists(leaveId) {
    return this.count({ where: { id: leaveId } });
  }

  async deleteLeave(id, type) {
    return this.delete(id, type);
  }
}

module.exports = new LeaveRepo();
