const { RolePermission } = require("../models");
const db = require("../models/index");

const BaseRepository = require("./BaseRepo");

class RolePermissionRepo extends BaseRepository {
  constructor() {
    super(RolePermission);
  }

  async assignPermissions(roleId, permissions) {
    const uniquePermissions = [...new Set(permissions)];
    return await RolePermission.bulkCreate(
      uniquePermissions.map((permissionId) => ({
        roleId,
        permissionId,
      })),
      { ignoreDuplicates: true }
    );
  }

  async getRolesWithPermissions() {
    return this.findAll({
      // include: [
      //   {
      //     model: db.Role,
      //     as: "Role",
      //     where: { isDeleted: false },
      //   },
      //   {
      //     model: db.Permission,
      //     as: "Permission",
      //     where: { isDeleted: false },
      //   },
      // ],
    });
  }

  async findById(id) {
    return this.findAll({ id });
  }
  // async getRolePermissions(roleId) {
  //   return RolePermission.findAll({
  //     where: { roleId },
  //     include: ["Permission"],
  //   });
  // }

  // async deleteRolePermission(roleId, permissionId) {
  //   return this.destroy({
  //     where: {
  //       roleId,
  //       permissionId,
  //     },
  //   });
  // }

}

module.exports = new RolePermissionRepo();
