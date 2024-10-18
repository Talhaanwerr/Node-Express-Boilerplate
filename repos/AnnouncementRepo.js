const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class AnnouncementRepo extends BaseRepository {
  model;
  constructor() {
    super(db.Announcement);
    this.model = db.Announcement;
  }

  async createAnnouncement(announcement) {
    return this.create(announcement);
  }

  async findAnnouncements(searchQuery) {
    if (searchQuery && Object.keys(searchQuery).length > 0) {
      return this.findAll(searchQuery);
    }
    return this.findAll();
  }

  async updateAnnouncement(announcement, id) {
    await this.update(announcement, { id });
    return this.findOne({ id });
  }

  // async findByEmail(email) {
  //   return this.findOne({ email });
  // }

  // async findByIdWithInclude(searchQuery) {
  //   return this.findOneWithInclude(searchQuery);
  // }

  // async isUserExists(email) {
  //   return this.count({
  //     email,
  //   });
  // }
}

module.exports = new AnnouncementRepo();
