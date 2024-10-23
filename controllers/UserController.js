const { Op } = require("sequelize");
const db = require("../models/index.js");
const UserRepo = require("../repos/UserRepo.js");
const DesignationRepo = require("../repos/DesignationRepo.js");
const RoleRepo = require("../repos/RoleRepo.js");

const {
  validateCreateUser,
  validateUpdateUser,
  validateCreateUserWithProfile,
} = require("../validators/UserValidator.js");
const BaseController = require("./BaseController.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserController extends BaseController {
  constructor() {
    super();
  }

  getUserById = async (req, res) => {
    const id = req?.user?.id;
    const customQuery = { id };

    const user = await UserRepo?.findByIdWithInclude(customQuery);
    if (!user) {
      return this.errorResponse(res, `User with ID ${id} not found`, 404);
    }

    user.password = undefined;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    return this.successResponse(
      res,
      user,
      `User with ID ${id} retrieved successfully`
    );
  };

  getAllUsers = async (req, res) => {
    const sortOrder = req?.query?.sortOrder || "id";
    const sortDirection = req?.query?.sortDirection || "DESC";

    const customQuery = {
      order: [[sortOrder, sortDirection]],
      where: {
        isDeleted: false,
      },
      limit: parseInt(req?.query?.limit) || 10,
      offset: parseInt(req?.query?.skip) || 0,
      attributes: { exclude: ["password"] },
    };

    if (req?.query?.firstName) {
      customQuery.where.firstName = {
        [Op.like]: `%${req?.query?.firstName}%`,
      };
    }

    if (req?.query?.lastName) {
      customQuery.where.lastName = {
        [Op.like]: `%${req?.query?.lastName}%`,
      };
    }

    if (req?.query?.email) {
      customQuery.where.email = {
        [Op.like]: `%${req?.query?.email}%`,
      };
    }

    if (req?.query?.status) {
      customQuery.where.status = req?.query?.status;
    }

    if (req?.query?.roleName) {
      customQuery.include = [
        {
          model: db.Role,
          as: "role",
          where: {
            roleName: req?.query?.roleName,
          },
        },
      ];
    }

    if (req?.query?.designationName) {
      customQuery.include = [
        {
          model: db.Designation,
          as: "designation",
          where: {
            designation_name: req?.query?.designationName,
          },
        },
      ];
    }

    const users = await UserRepo?.getUsers(customQuery);

    const count = await UserRepo?.countUsers();

    if (!users?.length) {
      return this.errorResponse(res, "No matching users found", 404);
    }

    return this.successResponse(
      res,
      {
        users,
        total: count,
      },
      "Users retrieved successfully"
    );
  };

  createUser = async (req, res) => {
    const validationResult = validateCreateUser(req?.body);

    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const {
      roleId,
      designationId,
      password = "demo123",
      email,
      id,
    } = req?.body;

    const saltRounds = 10;
    req.body.password = await bcrypt.hash(password, saltRounds);

    const [designationExists, roleExists] = await Promise.all([
      designationId
        ? DesignationRepo?.findById(designationId)
        : Promise.resolve(null),
      roleId ? RoleRepo?.findById(roleId) : Promise.resolve(null),
    ]);

    if (!designationExists) {
      return this.errorResponse(
        res,
        `Designation ID ${designationId} not found `,
        404
      );
    }

    if (!roleExists) {
      return this.errorResponse(res, "Role ID not found", 404);
    }

    const isUserExists = await UserRepo?.findUserByEmail(email);

    if (isUserExists) {
      return this.errorResponse(res, "User already exists", 409);
    } else {
      const user = await UserRepo?.createUser(req?.body);
      user.password = undefined;
      return this.successResponse(res, user, "User created successfully");
    }
  };

  createUserWithProfile = async (req, res) => {
    const validationResult = validateCreateUserWithProfile(req?.body);

    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const { profile, ...userData } = req?.body;

    const [designationExists, roleExists] = await Promise.all([
      userData.designationId
        ? DesignationRepo.findById(userData?.designationId)
        : Promise.resolve(null),
      userData.roleId
        ? RoleRepo.findById(userData?.roleId)
        : Promise.resolve(null),
    ]);

    if (!designationExists) {
      return this.errorResponse(res, "Designation ID not found", 404);
    }

    if (!roleExists) {
      return this.errorResponse(res, "Role ID not found", 404);
    }

    const user = await UserRepo?.createUserAndProfile({
      ...userData,
      profile: {
        ...profile,
      },
    });

    return this.successResponse(
      res,
      user,
      "User with profile created successfully"
    );
  };

  updateUser = async (req, res) => {
    const { id } = req?.params;
    const validationResult = validateUpdateUser(req?.body);

    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const isUser = await UserRepo?.isUserExists(id);

    if (!isUser) {
      return this.errorResponse(res, `User with ID ${id} not found`, 404);
    }

    const user = await UserRepo.updateUser(req?.body, id);
    return this.successResponse(
      res,
      user,
      `User with ID ${id} updated successfully`
    );
  };

  deleteUser = async (req, res) => {
    let { id } = req?.params;
    let { type } = req?.query;

    const isUser = await UserRepo?.isUserExists(id);

    if (!isUser) {
      return this.errorResponse(res, `User with ID ${id} not found`, 404);
    }

    type = type ? type : "soft";

    const user = await UserRepo?.deleteUser(id, type);
    return this.successResponse(
      res,
      user,
      `User with ID ${id} deleted successfully`
    );
  };
}

module.exports = new UserController();
