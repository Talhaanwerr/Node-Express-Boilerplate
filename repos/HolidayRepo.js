const BaseRepository = require("./BaseRepo");
const db = require("../models/index");

class HolidayRepo extends BaseRepository {
  constructor() {
    super(db.Holiday);
  }

  async findById(id) {
    return this.findOne({ id });
  }

  async createHoliday(holiday) {
    return this.create(holiday);
  }

  async getAllHolidays(condition = {}) {
    return this.findAll(condition);
  }

  async updateHoliday(holiday, id) {
    await this.update(holiday, { id });
    return this.findOne({ id });
  }

  async deleteHoliday(id, type) {
    if (type === "soft") {
      return this.model.update(
        {
          isDeleted: true,
        },
        {
          where: { id },
        }
      );
    } else if (type === "hard") {
      return this.model.destroy({
        where: { id },
      });
    }
  }

  async getHolidays(condition = {}) {
    return this.findAll(condition);
  }

  async findByName(name) {
    return this.findOne({ name });
  }

  async isHolidayExists(id) {
    return this.count({
      where: { id },
    });
  }
}

module.exports = new HolidayRepo();
