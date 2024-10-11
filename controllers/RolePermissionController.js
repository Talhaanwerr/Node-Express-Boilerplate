
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

    const query = `SELECT * from rolepermissions where roleId = :roleId`;

    const roleWithPermissions = await sequelize.query(query, {
      replacements: { roleId },
      type: sequelize.QueryTypes.SELECT,
    });

    return this.successResponse(
      res,
      roleWithPermissions,
      "Getting all roles with permissions"
    );
  };
}

module.exports = new RolePermissionController();
