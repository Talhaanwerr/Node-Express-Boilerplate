const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class DesignationRepo extends BaseRepository {
  model;
  constructor() {
    super(db.Designation);
    this.model = db.Designation;
  }

  async createDesignation(designation) {
    return this.create(designation);
  }

  async getDesignations(searchQuery = {}) {
    return this.findAll(searchQuery);
  }

  async findById(id) {
    return this.findOne({ id });
  }

  async updateDesignation(designation, id) {
    await this.update(designation, { id });
    return this.findById(id);
  }

  async deleteDesignation(id, type = "soft") {
    return this.delete(id, type);
  }

  async countDesignation(query = {}) {
    return this.count(query);
  }

  async isDesignationExists(id) {
    return this.count({ id });
  }

  async findByName(name) {
    return this.findOne({ name });
  }
}

module.exports = new DesignationRepo();