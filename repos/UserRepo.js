const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");
const { Op } = require("sequelize");

class UserRepo extends BaseRepository {
  constructor() {
    super(db.User);
    this.model = db.User;
  }

  async createUser(user) {
    return this.create(user);
  }

  async createUserAndProfile(user) {
    return this.runTransaction(async (transaction) => {
      const createdUser = await this.create(user, { transaction });
      const createdProfile = await db.UserProfile.create(
        { ...user.profile, userId: createdUser.id },
        { transaction }
      );
      return { user: createdUser, profile: createdProfile };
    });
  }

  async getUsers(searchQuery = {}) {
    return this.findAll({
      ...searchQuery,
      include: [
        {
          model: db.Role,
          as: "role",
          attributes: ["roleName"],
        },
        {
          model: db.Designation,
          as: "designation",
          attributes: ["designation_name"],
        },
        // {
        //   model: db.User,
        //   as: "reportingTo",
        //   attributes: ["firstName", "lastName"],
        // },
      ],
    });
  }

  async updateUser(user, id) {
    // R&D on find by id and update
    return this.update(user, { id }), this.findById(id);
  }

  async findById(id) {
    return this.findOne({ id });
  }

  async deleteUser(id, type = "soft") {
    return this.delete(id, type);
  }

  async countUsers(query = {}) {
    return this.count(query);
  }

  async findByIdWithInclude(customQuery) {
    return this.findOneWithInclude({
      where: { ...customQuery },
      include: [
        {
          model: db.Role,
          as: "role",
          attributes: ["roleName"],
        },
        {
          model: db.Designation,
          as: "designation",
          attributes: ["designation_name"],
        },
      ],
    });
  }

  async findByEmailWithInclude(email) {
    return this.findOneWithInclude({
      where: { email },
      include: [
        {
          model: db.Role,
          as: "role",
          attributes: ["roleName"],
        },
        {
          model: db.Designation,
          as: "designation",
          attributes: ["designation_name"],
        },
        {
          model: db.User,
          as: 'PrimaryReportees',
          attributes: ["firstName", "lastName", "email"],
        },
        {
          model: db.User,
          as: 'SecondaryReportees',
          attributes: ["firstName", "lastName", "email"],
        },
      ],
    });
  }

  async getRolePermissions(roleId) {
    return db.RolePermission.findAll({
      where: { roleId },
      include: [
        {
          model: db.Permission,
          as: "Permission",
          attributes: ["name"],
        },
      ],
    });
  }

  async isUserExists(id) {
    return this.count({
      id,
    });
  }

  async findRole(id) {
    return this.findByPk(id);
  }

  async findDesignation(id) {
    return this.findByPk(id);
  }

  async updateUserPassword(userId, newPassword) {
    return this.update({ password: newPassword }, { id: userId });
  }

  async findUserByResetToken(token) {
    return this.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: {
        [Op.gt]: Date.now(),
      },
    });
  }

  async findUserByEmail(email) {
    return this.findOne({ email });
  }
}

module.exports = new UserRepo();
