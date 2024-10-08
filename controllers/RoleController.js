const RoleRepo = require("../repos/RoleRepo.js");
const db = require("../models/index");

const {
  validateCreateRole,
  validateUpdateRole,
} = require("../validators/RoleValidator.js");
const BaseController = require("./BaseController.js");

class RoleController extends BaseController {
  constructor() {
    super();
  }

  createRole = async (req, res) => {
    const validationResult = validateCreateRole(req.body);

    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const role = await RoleRepo.createRole(req.body);
    return this.successResponse(res, role, "Role created successfully");
  };

  getRoles = async (req, res) => {
    const {
      sortBy = "id",
      sortOrder = "ASC",
      page = 1,
      limit = 10,
      search = "",
      filterByName,
    } = req.query;

    const skip = (page - 1) * limit;
    const searchParams = {};

    if (search) {
      searchParams[db.Sequelize.Op.or] = [
        { roleName: { [db.Sequelize.Op.like]: `%${search}%` } },
      ];
    }

    if (filterByName) {
      searchParams.roleName = {
        [db.Sequelize.Op.like]: `%${filterByName}%`,
      };
    }

    const condition = {
      order: [[sortBy, sortOrder]],
      limit: parseInt(limit),
      offset: skip,
      where: searchParams,
    };

    const roles = await RoleRepo.getRoles(condition);
    return this.successResponse(res, roles, "Getting All Roles");
  };
  

  getRoleById = async (req, res) => {
    const role = await RoleRepo.findRole(req.params.id);
    if (!role) {
      return this.errorResponse(res, "Role not found", 404);
    }
    return this.successResponse(res, role, "Getting Role");
  };

  updateRole = async (req, res) => {
    const validationResult = validateUpdateRole(req.body);
    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const role = await RoleRepo.updateRole(req.body, req.params.id);
    if (!role) {
      return this.errorResponse(res, "Role not found", 404);
    }
    return this.successResponse(res, role, "Role updated successfully");
  };

  deleteRole = async (req, res) => {
    const { type = "soft" } = req.query;
    const role = await RoleRepo.deleteRole(req.params.id, type);
    return this.successResponse(res, role, "Role deleted successfully");
  };
}

module.exports = new RoleController();
