const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class UserProfileRepo extends BaseRepository {
  constructor() {
    super(db.UserProfile);
    this.model = db.UserProfile;
  }

  async createUserProfile(userprofile) {
    return this.create(userprofile);
  }

  async getUserProfiles(searchQuery = {}) {
    return this.findAll(searchQuery);
  }

  async updateUserProfile(userprofile, id) {
    // R&D on find by id and update
    return this.update(userprofile, { id }), this.findById(id);
  }

  async findById(id) {
    return this.findOne({ id });
  }

  async deleteUserProfile(id, type = "soft") {
    return this.delete(id, type);
  }

  async countPermission(query = {}) {
    return this.count(query);
  }

  // async findByIdWithInclude(searchQuery) {
  //   return this.findOneWithInclude(searchQuery);
  // }

  async isUserProfileExists(id) {
    return this.count({
      id,
    });
  }

  async findByIdWithInclude(userId) {
    return this.findOneWithInclude({
      where: { userId },
      include: [
        {
          model: db.User,
          as: "user",
          attributes: [
            "firstName",
            "lastName",
            "email",
            "status",
            "shiftTime",
            "profilePicture",
            "primaryReporting",
            "secondaryReporting",
          ],
          include: [
            {
              model: db.Designation,
              as: "designation",
              attributes: ["name"],
            },
            {
              model: db.Role,
              as: "role",
              attributes: ["name"],
            },
            {
              model: db.User,
              as: "primaryReport",
              attributes: ["firstName", "lastName", "email"],
            },
            {
              model: db.User,
              as: "secondaryReport",
              attributes: ["firstName", "lastName", "email"],
            },
          ],
        },
      ],
    });
  }

  async findUser(id) {
    return this.findByPk(id);
  }

  // async findUser(id) {
  //   return db.User.findByPk(id);
  // }

  async isUserIdAssignedToProfile(userId) {
    return this.count({
      userId,
    });
  }

  async getProfileIdByUserId(userId) {
    return this.findOne({
      userId,
    });
  }

  async findUserByCnic(cnicNo) {
    return this.findOne({ cnicNo });
  }



}

module.exports = new UserProfileRepo();
