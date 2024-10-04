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
    return this.update(data, { id });
  }

  async deleteRole(id, type) {
    return this.delete(id, type)
  }

  async getRoles() {
    return this.findAll();
  }
  async findRole(id) {
    return this.findOne({ 
      id
     } );
  }
}

module.exports = new RoleRepo();
