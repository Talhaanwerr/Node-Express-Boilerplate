// const { Op } = require("sequelize");
const db = require("../models/index.js");
const UserRepo = require("../repos/UserRepo.js");
const {
  validateCreateUser,
  validateUpdateUser,
} = require("../validators/UserValidator.js");
const BaseController = require("./BaseController.js");

class UserController extends BaseController {
  constructor() {
    super();
  }

  getUserById = async (req, res) => {
    const { id } = req?.params;
    const user = await UserRepo.findById(id);

    if (!user) {
      return this.errorResponse(res, "User ID not found", 404);
    }

    return this.successResponse(res, user, "User retrieved successfully");
  };

  getAllUsers = async (req, res) => {
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

    if (search) {
      searchParams[db.sequelize.Op.or] = [{}];
    }

    const users = await UserRepo.getUsers();
    return this.successResponse(res, users, "Users retrieved successfully");
  };

  createUser = async (req, res) => {
    const validationResult = validateCreateUser(req?.body);

    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const user = await UserRepo.createUser(req?.body);

    return this.successResponse(res, user, "User created successfully");
  };

  createUserWithProfile = async (req, res) => {
    const validationResult = validateCreateUserWithProfile(req.body);

    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const { profile, ...userData } = req.body;
    console.log(userData);
    console.log(profile);

    try {
      const user = await UserRepo.createUserAndProfile({
        ...userData,
        profile: {
          ...profile,
        },
      });

      console.log(user);

      return this.successResponse(
        res,
        user,
        "User with profile created successfully"
      );
    } catch (e) {
      console.log(e);
      throw new Error("Error creating user and user profile");
    }
  };

  updateUser = async (req, res) => {
    const { id } = req.params;
    const validationResult = validateUpdateUser(req.body);

    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const isUser = await UserRepo.isUserExists(id);

    if (!isUser) {
      return this.errorResponse(res, "User ID not found", 404);
    }

    const user = await UserRepo.updateUser(req.body, id);
    return this.successResponse(res, user, "User updated successfully");
  };

  deleteUser = async (req, res) => {
    let { id } = req?.params;
    let { type } = req?.query;

    const isUser = await UserRepo.isUserExists(id);

    if (!isUser) {
      return this.errorResponse(res, "User ID not found", 404);
    }

    type = type ? type : "soft";

    const user = await UserRepo.deleteUser(id, type);
    return this.successResponse(
      res,
      user,
      `User with ID ${id} deleted successfully`
    );
  };
}

module.exports = new UserController();
