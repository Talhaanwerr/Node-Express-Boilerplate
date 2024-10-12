// const { Op } = require("sequelize");
const UserProfileRepo = require("../repos/UserProfileRepo.js");
const {
  validateUpdateUserProfile,
  validateCreateUserProfile,
} = require("../validators/UserProfileValidator.js");
const BaseController = require("./BaseController.js");

class UserProfileController extends BaseController {
  constructor() {
    super();
  }

  getUserProfileById = async (req, res) => {
    const { id } = req?.params;
    const user = await UserProfileRepo.findById(id);

    if (!user) {
      return this.errorResponse(res, "User ID not found", 404);
    }

    return this.successResponse(res, user, "User retrieved successfully");
  };

  getAllUserProfiles = async (req, res) => {
    const {
      sortBy = "id",
      sortOrder = "DESC",
      page = 1,
      limit = 10,
      search = "",
      filterByName,
      filterByEmail,
      filterByStatus,
    } = req?.query;

    const skip = (page - 1) * limit;
    const searchParams = {};

    const customQuery = {
      where: {
        isDeleted: false,
        ...searchParams,
      },
    };

    if (search) {
      searchParams[db.sequelize.Op.or] = [{}];
    }

    const userProfiles = await UserProfileRepo.getUserProfiles(customQuery);

    if (!userProfiles.length) {
      return this.errorResponse(res, "User Profiles not found", 404);
    }

    return this.successResponse(
      res,
      userProfiles,
      "User Profiles retrieved successfully"
    );
  };

  createUserProfile = async (req, res) => {
    const validationResult = validateCreateUserProfile(req?.body);

    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const user = await UserProfileRepo.createUserProfile(req?.body);

    return this.successResponse(res, user, "User Profile created successfully");
  };

  updateUserProfile = async (req, res) => {
    const { id } = req?.params;
    const validationResult = validateUpdateUserProfile(req?.body);

    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const isUserProfile = await UserProfileRepo.isUserProfileExists(id);

    if (!isUserProfile) {
      return this.errorResponse(res, "User Profile ID not found", 404);
    }

    const user = await UserProfileRepo.updateUserProfile(req.body, id);
    return this.successResponse(res, user, "User Profile updated successfully");
  };

  deleteUserProfile = async (req, res) => {
    let { id } = req?.params;
    let { type } = req?.query;

    const isUserProfile = UserProfileRepo.isUserProfileExists(id);

    if (!isUserProfile) {
      return this.errorResponse(res, "User Profile ID not found", 404);
    }

    type = type ? type : "soft";

    const permission = await UserProfileRepo.deleteUserProfile(id, type);

    return this.successResponse(
      res,
      permission,
      `User Profile with ID ${id} deleted successfully`
    );
  };
}

module.exports = new UserProfileController();
