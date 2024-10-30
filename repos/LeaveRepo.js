const { Leave } = require('../models');

class LeaveRepo {
  static async findById(id) {
    return await Leave.findByPk(id);
  }

  static async getLeaves(query) {
    return await Leave.findAll(query);
  }

  static async countLeaves() {
    return await Leave.count();
  }

  static async createLeave(data) {
    return await Leave.create(data);
  }

  static async updateLeave(id, data) {
    return await Leave.update(data, { where: { id }, returning: true });
  }

  static async deleteLeave(id, type = 'soft') {
    if (type === 'soft') {
      return await Leave.update({ isDeleted: true }, { where: { id } });
    }
    return await Leave.destroy({ where: { id } });
  }
}

module.exports = LeaveRepo;
