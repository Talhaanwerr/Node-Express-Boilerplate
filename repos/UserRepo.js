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
    return this.findAll(searchQuery);
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

  async countPermission(query = {}) {
    return this.count(query);
  }

  // async findByIdWithInclude(searchQuery) {
  //   return this.findOneWithInclude(searchQuery);
  // }

  async isUserExists(id) {
    return this.count({
      id,
    });
  }
}

module.exports = new UserRepo();
