
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

  async updateRole(role, id) {
    await this.update(role, { id }); 
    return this.findOne({ id });
  }
  

  async deleteRole(id, type) {
    return this.delete(id, type);
  }

  async getRoles(condition = {}) {
    return this.findAll(condition);
  }

  async findRole(id) {
    return this.findOne({ id });
  }

  async isRoleExists(i) {
    return this.count({
      id,
    });
  }
}

module.exports = new RoleRepo();
