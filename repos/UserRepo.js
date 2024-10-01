const BaseRepository = require("./BaseRepo");
const db = require("../models/index.js");

class UserRepo extends BaseRepository {
  model;
  constructor() {
    super(db.User);
    this.model = db.User;
  }

  async createUser(user) {
    return this.create(user);
  }

  async findByEmail(email) {
    return this.findOne({email});
  }

  async findByIdWithInclude(searchQuery) {
    return this.findOneWithInclude(searchQuery);
  }

  async findUsers(searchQuery) {
    if (searchQuery && Object.keys(searchQuery).length > 0) {
      return this.findAll(searchQuery);
    }
    return this.findAll();
  }

  async isUserExists(email) {
    return this.count({
      email
    });
  }

  async updateUser(user, email) {
    await this.update(user, {email});
    return this.findByEmail(email);
  }

}

module.exports = new UserRepo();
