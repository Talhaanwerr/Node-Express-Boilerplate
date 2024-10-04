const RoleRepo = require("../repos/RoleRepo.js");
const { validateCreateRole } = require("../validators/RoleValidator.js");
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
    const customQuery = {};
    const sortDirection = req.query.sortDirection || "ASC"
    if(req.query.sortOrder){
      condition.order = [[sortOrder, sortDirection]]
    }
    const role = await RoleRepo.getRoles();
    return this.successResponse(res, role, "Getting All Roles");
  };

  getRoleById = async (req, res) => {
    const role = await RoleRepo.findRole(req.params.id);
    if (!role) {
      return this.errorResponse(res, "Role not found", 404);
    }
    return this.successResponse(res, role, "Getting Role ");
  };

  updateRole = async (req, res) => {
    const role = await RoleRepo.updateRole(req.body, req.params.id);
    if (!role) {
      return this.errorResponse(res, "Role not found", 404);
    }
    return this.successResponse(res, role, "Role Updated successfully");
  };

  deleteRole = async (req, res) => {
    const { id } = req.params;
    const { type } = req.query;
    // check if role exist
    type = type ? type : "soft";
    const role = await RoleRepo.deleteRole(id, type);
    return this.successResponse(res, role, "Role Deleted successfully");
  };
}

module.exports = new RoleController();
