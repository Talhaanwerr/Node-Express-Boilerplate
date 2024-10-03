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

  updateRole = async (req, res) => {
    

    const role = await RoleRepo.updateRole(req.body,req.params.id);
    return this.successResponse(res, role, "Role Updated successfully");
  };

  deleteRole = async (req, res) => {
   
    const role = await RoleRepo.deleteRole(req.params.id);
    return this.successResponse(res, role, "Role Deleted successfully");
  };
}

module.exports = new RoleController();
