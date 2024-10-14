const role = require("../models/role");
const RolePermissionRepo = require("../repos/RolePermissionRepo");
const RolePermissionValidator = require("../validators/RolePermissionValidator");
const BaseController = require("./BaseController");
const { sequelize } = require("../models");

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

    const rolePermission = await RolePermissionRepo.assignPermissions(
      roleId,
      permissions
    );


    return this.successResponse(
      res,
      rolePermission,
      "Permissions assigned successfully"
    );
  };

  getRolesWithPermissions = async (req, res) => {
    const roleWithPermissions =
      await RolePermissionRepo.getRolesWithPermissions();

    if (!roleWithPermissions || roleWithPermissions.length === 0) {
      return this.errorResponse(res, "Role Not Found", 404);
    }

    return this.successResponse(
      res,
      roleWithPermissions,
      "Getting all Roles with Permissions"
    );
  };

  getRolesWithPermissionsById = async (req, res) => {
    const { roleId } = req.params;

    const roleWithPermissions = await RolePermissionRepo.findOneWithInclude(
      roleId
    );

    if (!roleWithPermissions || roleWithPermissions.length === 0) {
      return this.errorResponse(res, "Role Not Found", 404);
    }

    return this.successResponse(
      res,
      roleWithPermissions,
      "Getting Role with Permissions"
    );
  };

  updateRolePermission = async (req, res) => {
    const { roleId, permissionId } = req.params;

    const isRolePermissionExist =
      await RolePermissionRepo.isRolePermissionExists(roleId, permissionId);
    if (!isRolePermissionExist) {
      return this.errorResponse(res, "Role Permission not found", 404);
    }

    const validationResult =
      RolePermissionValidator.validateUpdateRolePermission(req.body);
    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const updatedRolePermission = await RolePermissionRepo.updateRolePermission(
      req.body,
      roleId,
      permissionId
    );
    return this.successResponse(
      res,
      updatedRolePermission,
      "Role Permission updated successfully"
    );
  };
}

module.exports = new RolePermissionController();
