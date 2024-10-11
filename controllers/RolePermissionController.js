
const RolePermissionRepo = require('../repos/RolePermissionRepo');
const RolePermissionValidator = require('../validators/RolePermissionValidator');
const BaseController = require('./BaseController'); 
class RolePermissionController extends BaseController {
  constructor() {
    super();
  }

  assignPermissions = async (req, res) => {
    const validationResult = RolePermissionValidator.validateAssignPermissions(req.body);

    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const { roleId, permissions } = req.body;

    await RolePermissionRepo.assignPermissions(roleId, permissions);
    return this.successResponse(res, null, 'Permissions assigned successfully');
  };

  getRolesWithPermissions = async (req, res) => {
    const roles = await RolePermissionRepo.getRolesWithPermissions();
    return this.successResponse(res, roles, 'Getting all roles with permissions');
};

  // getRolePermissions = async (req, res) => {
  //   const { roleId } = req.params;
  //   const permissions = await RolePermissionRepo.getRolePermissions(roleId);
  //   return this.successResponse(res, permissions, 'Getting permissions for the role');
  // };

  // deleteRolePermission = async (req, res) => {
  //   const validationResult = RolePermissionValidator.validateDeleteRolePermission(req.body);

  //   if (!validationResult.status) {
  //     return this.validationErrorResponse(res, validationResult.message);
  //   }

  //   const { roleId, permissionId } = req.body;
  //   await RolePermissionRepo.deleteRolePermission(roleId, permissionId);
  //   return this.successResponse(res, null, ' deleted successfully');
  // };
}

module.exports = new RolePermissionController();
