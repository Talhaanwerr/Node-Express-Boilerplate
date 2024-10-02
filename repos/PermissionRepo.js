const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class PermissionRepo extends BaseRepository {
  model;
  constructor() {
    super(db.Permission);
    this.model = db.Permission;
  }

  async createPermission(permission) {
    return this.create(permission);
  }

  async findPermission(searchQuery) {
    if (searchQuery && Object.keys(searchQuery).length > 0) {
      return this.findAll(searchQuery);
    }
    return this.findAll();
  }

  async updatePermission(permission, id) {
    await this.update(permission, { id });
    return this.findById(id);
  }

  async findById(id) {
    return this.findOne({ id });
  }

  async deletePermission(id, type = "soft") {
    switch (type) {
      case "soft":
        return this.update({ isDeleted: true }, { id });
      case "hard":
        return this.delete({ id });
    }
  }

  // async findByIdWithInclude(searchQuery) {
  //   return this.findOneWithInclude(searchQuery);
  // }

  // async isUserExists(email) {
  //   return this.count({
  //     email,
  //   });
  // }
}

module.exports = new PermissionRepo();
