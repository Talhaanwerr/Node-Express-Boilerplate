const PermissionRepo = require("../repos/PermissionRepo.js");
const {
  validateCreatePermission,
  validateUpdatePermission,
} = require("../validators/PermissionValidator.js");
const BaseController = require("./BaseController.js");

class PermissionController extends BaseController {
  constructor() {
    super();
  }

  getAllPermission = async (req, res) => {
    const permissions = await PermissionRepo.findPermission(req.query);

    return this.successResponse(
      res,
      permissions,
      "Permissions retrieved successfully"
    );
  };

  createPermission = async (req, res) => {
    const validationResult = validateCreatePermission(req.body);

    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const permission = await PermissionRepo.createPermission(req.body);

    return this.successResponse(
      res,
      permission,
      "Permission created successfully"
    );
  };

  updatePermission = async (req, res) => {
    const id = req.params.id;
    const validationResult = validateUpdatePermission(req.body);
    const validationId = id === PermissionRepo.findById(id) ? true : false;

    if (!validationId) {
      return this.errorResponse(res, "Permission ID is required", 404);
    }

    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const permission = await PermissionRepo.updatePermission(req.body, id);

    return this.successResponse(
      res,
      permission,
      "Permission updated successfully"
    );
  };

  deletePermission = async (req, res) => {
    const id = req.params.id;
    const validationId = id === PermissionRepo.findById(id) ? true : false;

    if (!validationId) {
      return this.errorResponse(res, "Permission ID is required", 404);
    }

    let type = req.query.type ? req.query.type : "soft";
    const permission = await PermissionRepo.deletePermission(id, type);

    return this.successResponse(
      res,
      permission,
      `Permission with ID ${id} deleted successfully`
    );
  };
}

module.exports = new PermissionController();
