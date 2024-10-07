const { Op } = require("sequelize");
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
    const sortOrder = req?.query?.sortOrder || "id";
    const sortDirection = req?.query?.sortDirection || "ASC";

    const customQuery = {
      order: [[sortOrder, sortDirection]],
      where: {},
    };

    if (req?.query?.name) {
      customQuery.where.name = {
        [Op.like]: `%${req?.query?.name}%`,
      };
    }

    if (req?.query?.module) {
      customQuery.where.module = {
        [Op.like]: `%${req?.query?.module}%`,
      };
    }

    if (req?.query?.createdAt) {
      customQuery.where.createdAt = {
        [Op.like]: `%${req?.query?.createdAt}%`,
      };
    }

    const permissions = await PermissionRepo.getPermission(customQuery);

    if (!permissions || permissions.length === 0) {
      return this.errorResponse(res, "No matching permissions found", 404);
    }

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
    const { id } = req.params;
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
    let { id } = req?.params;
    let { type } = req?.query;

    const isPermission = await PermissionRepo.findById(id);

    if (!isPermission) {
      return this.errorResponse(res, "Permission ID is required", 404);
    }

    type = type ? type : "soft";
    const permission = await PermissionRepo.deletePermission(id, type);

    return this.successResponse(
      res,
      permission,
      `Permission with ID ${id} deleted successfully`
    );
  };
}

module.exports = new PermissionController();
