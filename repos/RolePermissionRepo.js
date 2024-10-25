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

  async getRolesWithPermissions(searchQuery = {}) {
    return await this.findAll({
      ...searchQuery,
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
    return this.findOne({ where: { id } });
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
      where: { roleId },
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

  async isPermissionExists(permissions) {
    return db.Permission.findAll({
      where: {
        id: permissions,
      },
    });
  }



  async findByRoleId(roleId) {
    return this.findAll({ where: { roleId } });
  }

  async deleteById(rolePermissionId){
    return this.model.destroy({
      where: { id: rolePermissionId },
    });
  }



}

module.exports = new RolePermissionRepo();
