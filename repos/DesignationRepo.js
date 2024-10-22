const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class DesignationRepo extends BaseRepository {
  model;
  constructor() {
    super(db.Designation); // Use Designation model
    this.model = db.Designation;
  }

  // Create Designation
  async createDesignation(designation) {
    return this.create(designation);
  }

  // Get all Designations with optional search query
  async getDesignations(searchQuery = {}) {
    return this.findAll(searchQuery);
  }

  // Find Designation by ID
  async findById(id) {
    return this.findOne({ id });
  }

  // Update Designation by ID
  async updateDesignation(designation, id) {
    await this.update(designation, { id });
    return this.findById(id);
  }

  // Soft delete Designation by ID (set isDeleted = true)
  async deleteDesignation(id, type = "soft") {
    return this.delete(id, type);
  }

  // Count the number of Designations (for pagination or other needs)
  async countDesignation(query = {}) {
    return this.count(query);
  }

  // Check if a Designation exists by ID
  async isDesignationExists(id) {
    return this.count({ id });
  }
}

module.exports = new DesignationRepo();