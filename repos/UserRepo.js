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
    return db.sequelize.transaction(async (transaction) => {
      const createdUser = await this.create(user, { transaction });
      const createdProfile = await db.UserProfile.create(
        { ...user.profile, userId: createdUser.id },
        { transaction }
      );

      createdUser.password = undefined;

      return { user: createdUser, profile: createdProfile };
    });
  }

  async getUsers(searchQuery = {}) {
    return this.findAll(searchQuery);
  }

  async updateUser(user, id) {
    await this.update(user, { id });
    return this.findById(id);
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
    return this.findOneWithInclude(customQuery);
  }

  async findByEmailWithInclude(customQuery) {
    return this.findOneWithInclude(customQuery);
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

  async findUserByName(lastName) {
    return this.findOne({ lastName });
  }

  async findUsersByDateOfBirth() {
    return this.findAll();
  }
}

module.exports = new UserRepo();
