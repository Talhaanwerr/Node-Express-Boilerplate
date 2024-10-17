const { RolePermission } = require("../models");
const db = require("../models/index");
const BaseRepository = require("./BaseRepo");

class RolePermissionRepo extends BaseRepository {
  constructor() {
    super(RolePermission);
  }

  async assignPermissions(roleId, permissions) {
    const uniquePermissions = [...new Set(permissions)];
    const rolePermissions = uniquePermissions.map((permissionId) => ({
      roleId,
      permissionId,
    }));
    return this.bulkCreate(rolePermissions, {
      ignoreDuplicates: true,
    });
  }

  async getRolesWithPermissions() {
    return await this.findAll({
      include: [
        {
          model: db.Role,
          as: "Role",
          attributes: ["roleName"],
        },
        {
          model: db.Permission,
          as: "Permission",
          attributes: ["name", "module"],
        },
      ],
    });
  }

  async findById(id) {
    return this.findAll({ id });
  }

  async isRolePermissionExists(roleId, permissionId) {
    return this.findOne({
      where: {
        roleId,
        permissionId,
      },
    });
  }

  async findOneWithInclude(roleId) {
    return this.findAll({
      where: { roleId: roleId },
      include: [
        {
          model: db.Role,
          as: "Role",
          attributes: ["roleName"],
        },
        {
          model: db.Permission,
          as: "Permission",
          attributes: ["name", "module"],
        },
      ],
    });
  }

  async updateRolePermission(data, roleId, permissionId) {
    return this.update(data, {
      where: {
        roleId,
        permissionId,
      },
    });
  }
}

module.exports = new RolePermissionRepo();
