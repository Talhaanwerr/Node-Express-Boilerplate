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

  async findAnnouncements(id) {
    return this.findOne({ id });
  }

  async getAnnouncement(condition = {}) {
    return this.findAll(condition);
  }

  async updateAnnouncement(announcement, id) {
    await this.update(announcement, { id });
    return this.findOne({ id });
  }

  async isAnnouncementExists(announcementId) {
    return this.count({ where: { id: announcementId } });
  }

  async deleteAnnouncement(id, type) {
    return this.delete(id, type);
  }
}

module.exports = new AnnouncementRepo();
