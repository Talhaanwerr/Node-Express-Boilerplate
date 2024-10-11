const BaseRepository = require("./BaseRepo");
const db = require("../models/index");

class RoleRepo extends BaseRepository {
  constructor() {
    super(db.Role);
    this.model = db.Role;
  }

  async createRole(role) {
    return this.create(role);
  }

  async updateRole(role, roleId) {
    await this.update(role, { roleId }); 
    return this.findOne({ roleId }); 
  }

  async deleteRole(roleId, type) {
    return this.delete(roleId, type); 
  }

  async getRoles(condition = {}) {
    return this.findAll(condition);
  }

  async findRole(roleId) {
    return this.findOne({ roleId }); 
  }

  async isRoleExists(roleId) {
    return this.count({
      roleId, 
    });
  }
}

module.exports = new RoleRepo();
