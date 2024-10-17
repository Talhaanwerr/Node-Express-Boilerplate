const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

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
      where: { customQuery },
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

  async findUserByEmail(email) {
    return this.findOne({ email });
  }

  async updateUserPassword(userId, newPassword) {
    return this.update({ password: newPassword }, { id: userId });
  }
}

module.exports = new UserRepo();
