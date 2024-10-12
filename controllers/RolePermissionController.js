const role = require("../models/role");
const RolePermissionRepo = require("../repos/RolePermissionRepo");
const RolePermissionValidator = require("../validators/RolePermissionValidator");
const BaseController = require("./BaseController");
const { sequelize } = require("../models");
const permission = require("../models/permission");

class RolePermissionController extends BaseController {
  constructor() {
    super();
  }

  assignPermissions = async (req, res) => {
    const validationResult = RolePermissionValidator.validateAssignPermissions(
      req.body
    );

    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const { roleId, permissions } = req.body;
    if(permissions.length){
      // Delete all role-permissions of roleId
    }

    const rolePermission = await RolePermissionRepo.assignPermissions(
      roleId,
      permissions
    );

    console.log("role permission ", rolePermission);

    return this.successResponse(
      res,
      rolePermission,
      "Permissions assigned successfully"
    );
  };

  getRolesWithPermissions = async (req, res) => {
    const roles = await RolePermissionRepo.getRolesWithPermissions();
    return this.successResponse(
      res,
      roles,
      "Getting all roles with permissions"
    );
  };

  getRolesWithPermissionsById = async (req, res) => {
    const { roleId } = req?.params;

    // const customQuery = {
    //   where: roleId,
    //   include: 
    // }

    // get role with include

    // RoleRepo.getPermissionsByRole(customQuery)

    const query = `SELECT * from rolepermissions where roleId = :roleId`;

    const roleWithPermissions = await sequelize.query(query, {
      replacements: { roleId },
      type: sequelize.QueryTypes.SELECT,
    });

    // role = {
    //   name: "Admin",
    //   createdaT: "sdfds"
    //   permissions: [
    //     {
    //       name: "create-user"
    //     }
    //   ]
    // }

    return this.successResponse(
      res,
      roleWithPermissions,
      "Getting all roles with permissions"
    );
  };

  updateRolePermission = async (req, res) => {
    const { roleId, permissionId } = req.params;

    const isRolePermissionExist = await RolePermissionRepo.isRolePermissionExists(roleId, permissionId);
    if (!isRolePermissionExist) {
      return this.errorResponse(res, "Role-Permission not found", 404);
    }

    const validationResult = RolePermissionValidator.validateUpdateRolePermission(req.body);
    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const updatedRolePermission = await RolePermissionRepo.updateRolePermission(req.body, roleId, permissionId);
    return this.successResponse(res, updatedRolePermission, "Role-Permission updated successfully");
  };

  
}

module.exports = new RolePermissionController();
