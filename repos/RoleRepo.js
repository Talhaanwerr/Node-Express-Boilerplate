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

  async updateRole(data, id) {
    return this.model.update(data, { where: { id } });
  }
  
  async deleteRole(id) {
    return this.model.update({ isDeleted: true }, { where: { id } });
  }
  
}

module.exports = new RoleRepo();
