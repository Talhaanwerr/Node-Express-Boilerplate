const RolePermissionRepo = require("../repos/RolePermissionRepo");
const RoleRepo = require("../repos/RoleRepo");
const RolePermissionValidator = require("../validators/RolePermissionValidator");
const BaseController = require("./BaseController");
const db = require("../models");

class RolePermissionController extends BaseController {
  constructor() {
    super();
  }

  // assignPermissions = async (req, res) => {
  //   const validationResult = RolePermissionValidator.validateAssignPermissions(
  //     req?.body
  //   );

  //   if (!validationResult.status) {
  //     return this.validationErrorResponse(res, validationResult.message);
  //   }

  //   const { roleName, permissions } = req?.body;

  //   const role = await RoleRepo?.findByName(roleName);

  //   const {roleId} = role;

  //   const isRoleExist = await RolePermissionRepo?.isRoleExists(roleId);

  //   if (!isRoleExist) {
  //     return this.errorResponse(res, `Role with ID ${roleId} not found`, 404);
  //   }

  //   const permissionsExistPromises = permissions.map((permissionId) =>
  //     RolePermissionRepo.isPermissionExists([permissionId])
  //   );

  //   const permissionsExistResults = await Promise.all(permissionsExistPromises);

  //   const invalidPermissions = permissions?.filter(
  //     (permissionId, index) => permissionsExistResults[index].length === 0
  //   );

  //   if (invalidPermissions?.length > 0) {
  //     return this.errorResponse(
  //       res,
  //       `Permissions not found: ${invalidPermissions.join(", ")}`,
  //       404
  //     );
  //   }

  //   const rolePermission = await RolePermissionRepo?.assignPermissions(
  //     roleId,
  //     permissions
  //   );

  //   return this.successResponse(
  //     res,
  //     rolePermission,
  //     "Permissions assigned successfully"
  //   );
  // };

  assignPermissions = async (req, res) => {
    const validationResult = RolePermissionValidator.validateAssignPermissions(
      req?.body
    );

    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const { roleName, permissions } = req?.body;

    const role = await RoleRepo?.findByName(roleName);

    if (!role) {
      return this.errorResponse(
        res,
        `Role with name ${roleName} not found`,
        404
      );
    }

    const { roleId } = role;

    // const isRoleExist = await RolePermissionRepo?.isRoleExists(roleId);

    // if (!isRoleExist) {
    //   return this.errorResponse(res, `Role with ID ${roleId} not found`, 404);
    // }

    const permissionsExistPromises = permissions.map((permissionId) =>
      RolePermissionRepo.isPermissionExists([permissionId])
    );
    const permissionsExistResults = await Promise.all(permissionsExistPromises);

    const invalidPermissions = permissions?.filter(
      (permissionId, index) => permissionsExistResults[index].length === 0
    );

    if (invalidPermissions?.length > 0) {
      return this.errorResponse(
        res,
        `Permissions not found: ${invalidPermissions.join(", ")}`,
        404
      );
    }

    const existingRolePermissions = await RolePermissionRepo?.findByRoleId(
      roleId
    );

    if (existingRolePermissions && existingRolePermissions.length > 0) {
      const rolePermissionIds = existingRolePermissions.map((item) => {
        return item.id;
      });

      await Promise.all(
        rolePermissionIds.map((rolePermissionId) =>
          RolePermissionRepo?.deleteById(rolePermissionId)
        )
      );
    }

    const rolePermission = await RolePermissionRepo?.assignPermissions(
      roleId,
      permissions
    );

    return this.successResponse(
      res,
      rolePermission,
      "Permissions overwritten successfully"
    );
  };

  getRolesWithPermissions = async (req, res) => {
    const roleWithPermissions =
      await RolePermissionRepo?.getRolesWithPermissions();

    if (!roleWithPermissions || roleWithPermissions?.length === 0) {
      return this.errorResponse(res, "Role Not Found", 404);
    }

    return this.successResponse(
      res,
      roleWithPermissions,
      "Getting all Roles with Permissions"
    );
  };

  getRolesWithPermissionsById = async (req, res) => {
    const { roleId } = req?.params;

    const roleWithPermissions = await RolePermissionRepo?.findOneWithInclude(
      roleId
    );

    if (!roleWithPermissions || roleWithPermissions?.length === 0) {
      return this.errorResponse(res, `Role with ID ${roleId} Not Found`, 404);
    }

    const response = {
      roleId: roleId,
      permissions: roleWithPermissions.map((rp) => rp.permissionId),
    };

    return this.successResponse(res, response, "Getting Role with Permissions");
  };

  updateRolePermission = async (req, res) => {
    const { roleId, permissionId } = req?.params;

    const isRolePermissionExist =
      await RolePermissionRepo?.isRolePermissionExists(roleId, permissionId);
    if (!isRolePermissionExist) {
      return this.errorResponse(res, "Role Permission not found", 404);
    }

    const validationResult =
      RolePermissionValidator.validateUpdateRolePermission(req?.body);
    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const updatedRolePermission =
      await RolePermissionRepo?.updateRolePermission(
        req?.body,
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
