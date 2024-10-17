const user = require("../models/user");
const UserPermissionRepo = require("../repos/UserPermissionRepo");
const UserPermissionValidator = require("../validators/UserPermissionValidator");
const BaseController = require("./BaseController");

class UserPermissionController extends BaseController {
    constructor() {
        super();
    }

    assignPermissions = async(req, res) => {
        const validationResult = UserPermissionValidator.validateAssignPermissions(
            req.body
        );

        if (!validationResult.status) {
            return this.validationErrorResponse(res, validationResult.message);
        }

        const { userId, permissions } = req.body;

        const userPermission = await UserPermissionRepo.assignPermissions(
            userId,
            permissions
        );

        return this.successResponse(
            res,
            userPermission,
            "Permissions assigned successfully to the user"
        );
    };

    getUsersWithPermissions = async(req, res) => {
        const usersWithPermissions = await UserPermissionRepo.getUsersWithPermissions();

        if (!usersWithPermissions || usersWithPermissions.length === 0) {
            return this.errorResponse(res, "User Not Found", 404);
        }

        return this.successResponse(
            res,
            usersWithPermissions,
            "Getting all Users with Permissions"
        );
    };

    getUsersWithPermissionsById = async(req, res) => {
        const { userId } = req.params;

        const userWithPermissions = await UserPermissionRepo.findOneWithInclude(
            userId
        );

        if (!userWithPermissions || userWithPermissions.length === 0) {
            return this.errorResponse(res, "User Not Found", 404);
        }

        return this.successResponse(
            res,
            userWithPermissions,
            "Getting User with Permissions"
        );
    };

    updateUserPermission = async(req, res) => {
        const { userId, permissionId } = req.params;

        const isUserPermissionExist = await UserPermissionRepo.isUserPermissionExists(
            userId,
            permissionId
        );
        if (!isUserPermissionExist) {
            return this.errorResponse(res, "User Permission not found", 404);
        }

        const validationResult = UserPermissionValidator.validateUpdateUserPermission(
            req.body
        );
        if (!validationResult.status) {
            return this.validationErrorResponse(res, validationResult.message);
        }

        const updatedUserPermission = await UserPermissionRepo.updateUserPermission(
            req.body,
            userId,
            permissionId
        );
        return this.successResponse(
            res,
            updatedUserPermission,
            "User Permission updated successfully"
        );
    };
}

module.exports = new UserPermissionController();