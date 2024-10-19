const BaseRepository = require("./BaseRepo");
const db = require("../models/index");

class RoleRepo extends BaseRepository {
  constructor() {
    super(db.Role);
    this.model = db.Role;
  }

  async findById(roleId) {
    return this.findOne({ roleId });
  }

  async createRole(role) {
    return this.create(role);
  }

  async getPermissionsByRole(customQuery) {
    this.findOneWithInclude(customQuery);
  }

  async updateRole(role, roleId) {
    await this.update(role, { roleId });
    return this.findOne({ roleId });
  }

  async deleteRole(roleId, type) {
    if (type === "soft") {
      return this.model.update(
        {
          isDeleted: true,
        },
        {
          where: {
            roleId,
          },
        }
      );
    } else if (type === "hard") {
      return this.model.destroy({
        where: { roleId },
      });
    }
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
