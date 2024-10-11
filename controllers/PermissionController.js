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

  getPermissionById = async (req, res) => {
    const { id } = req.params;
    const permission = await PermissionRepo.findById(id);

    if (!permission) {
      return this.errorResponse(res, "Permission ID not found", 404);
    }

    return this.successResponse(
      res,
      permission,
      "Permission retrieved successfully"
    );
  };

  getAllPermission = async (req, res) => {
    const sortOrder = req?.query?.sortOrder || "id";
    const sortDirection = req?.query?.sortDirection || "Desc";

    const customQuery = {
      order: [[sortOrder, sortDirection]],
      where: {
        isDeleted: false,
      },
      limit: parseInt(req.query.limit) || 10,
      offset: parseInt(req.query.skip) || 0,
    };

    if (req?.query?.name) {
      customQuery.where.name = {
        [Op.like]: `%${req?.query?.name}%`,
      };
    }

    // for searching
    if (req?.query?.module) {
      customQuery.where.module = {
        [Op.like]: `%${req?.query?.module}%`,
      };
    }

    // for filtering
    if (req?.query?.filterBymodule) {
      customQuery.where.filterBymodule = {
        [Op.eq]: `${req?.query?.filterBymodule}`,
      };
    }

    const permissions = await PermissionRepo.getPermissions(customQuery);

    const count = await PermissionRepo.countPermission({
      where: customQuery.where,
    });

    if (!permissions.length) {
      return this.errorResponse(res, "No matching permissions found", 404);
    }

    return this.successResponse(
      res,
      {
        permissions,
        total: count,
      },
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

    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const isPermission = PermissionRepo.isPermissionExists(id); // check if permission exists

    if (!isPermission) {
      return this.errorResponse(res, "Permission ID not found", 404); // fix error message
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

    const isPermission = PermissionRepo.isPermissionExists(id); // check if permission exists

    if (!isPermission) {
      return this.errorResponse(res, "Permission ID not found", 404); // fix error message
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
