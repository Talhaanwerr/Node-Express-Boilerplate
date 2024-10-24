const { Op } = require("sequelize");
const db = require("../models/index.js");
const UserProfileRepo = require("../repos/UserProfileRepo.js");
const UserRepo=require("../repos/UserRepo.js")
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
    const userId = req?.user?.id;

    const user = await UserProfileRepo?.findByIdWithInclude(userId);
    console.log("user", user);

    if (!user) {
      return this.errorResponse(res, `User with ID ${userId} not found`, 404);
    }

    return this.successResponse(
      res,
      user,
      `User with ID ${userId} retrieved successfully`
    );
  };

  getAllUserProfiles = async (req, res) => {
    const sortOrder = req?.query?.sortOrder || "id";
    const sortDirection = req?.query?.sortDirection || "DESC";

    const customQuery = {
      order: [[sortOrder, sortDirection]],
      where: {
        isDeleted: false,
      },
      limit: parseInt(req.query.limit) || 10,
      offset: parseInt(req.query.skip) || 0,
    };

    if (req?.query?.contactNo) {
      customQuery.where.contactNo = {
        [Op.like]: `%${req?.query?.contactNo}%`,
      };
    }

    if (req?.query?.cnicNo) {
      customQuery.where.cnicNo = {
        [Op.like]: `%${req?.query?.cnicNo}%`,
      };
    }

    if (req?.query?.city) {
      customQuery.where.city = {
        [Op.like]: `%${req?.query?.city}%`,
      };
    }
    if (req?.query?.gender) {
      customQuery.where.gender = {
        [Op.like]: `%${req?.query?.gender}%`,
      };
    }
    if (req?.query?.branch) {
      customQuery.where.branch = {
        [Op.like]: `%${req?.query?.branch}%`,
      };
    }
    // if (req?.query?.search) {
    //   customQuery.where[Op.or] = [
    //     { firstName: { [Op.like]: `%${req?.query?.search}%` } },
    //     { lastName: { [Op.like]: `%${req?.query?.search}%` } },
    //     { email: { [Op.like]: `%${req?.query?.search}%` } },
    //   ];
    // }

    if (req?.query?.userName) {
      customQuery.include = [
        {
          model: db.User,
          as: "user",
          where: {
            firstName: req?.query?.userName,
          },
        },
      ];
    }

    if (req?.query?.email) {
      customQuery.include = [
        {
          model: db.User,
          as: "user",
          where: {
            email: req?.query?.email,
          },
        },
      ];
    }

    const userProfiles = await UserProfileRepo?.getUserProfiles(customQuery);

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
    const { userId } = req?.body;

    if (userId) {
      const isUserExists = await UserRepo?.findById(userId);
      if (!isUserExists) {
        return this.errorResponse(res, `User with ID ${userId} not found`, 404);
      }

      const isUserIdAssigned = await UserProfileRepo?.isUserIdAssignedToProfile(
        userId
      );
      if (isUserIdAssigned) {
        return this.errorResponse(
          res,
          `User ID ${userId} is already assigned to another profile`,
          400
        );
      }
    }

    const user = await UserProfileRepo?.createUserProfile(req?.body);

    return this.successResponse(res, user, "User Profile created successfully");
  };

  updateUserProfile = async (req, res) => {
    const { id } = req?.params;
    const validationResult = validateUpdateUserProfile(req?.body);

    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const isUserProfile = await UserProfileRepo?.isUserProfileExists(id);

    if (!isUserProfile) {
      return this.errorResponse(
        res,
        `User Profile with ID ${id} not found`,
        404
      );
    }

    const user = await UserProfileRepo?.updateUserProfile(req.body, id);
    return this.successResponse(res, user, "User Profile updated successfully");
  };

  deleteUserProfile = async (req, res) => {
    let { id } = req?.params;
    let { type } = req?.query;

    const isUserProfile = UserProfileRepo?.isUserProfileExists(id);

    if (!isUserProfile) {
      return this.errorResponse(
        res,
        `User Profile with ID ${id} not found`,
        404
      );
    }

    type = type ? type : "soft";

    const permission = await UserProfileRepo?.deleteUserProfile(id, type);

    return this.successResponse(
      res,
      permission,
      `User Profile with ID ${id} deleted successfully`
    );
  };
}

module.exports = new UserProfileController();
