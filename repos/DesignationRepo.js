const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class DesignationRepo extends BaseRepository {
    constructor() {
<<<<<<< HEAD
        super(db.Designation); // Ensure the correct model is used from the start
    }

    // Create a new designation
    async createDesignation(designation) {
        return this.create(designation);
    }

    // Find designations with optional search query
    async findDesignation(searchQuery) {
        if (searchQuery && Object.keys(searchQuery).length > 0) {
            return this.findAll({
                where: searchQuery
            });
        }
        return this.findAll();
    }

    // Update designation by ID
    async updateDesignation(designation, id) {
        await this.update(designation, { where: { id } });
        return this.findOne({ where: { id } });
    }

    // Delete designation by ID
    async deleteDesignation(id) {
        await this.update({ isDeleted: true }, { where: { id } }); // Mark as deleted
        return `Designation with ID ${id} deleted successfully.`;
    }

    // Find designation by ID
    async findById(id) {
        return this.findOne({ where: { id } });
=======
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
        return this.findOne({ where: { id } });
    }

    // Update Designation by ID
    async updateDesignation(designation, id) {
        await this.update(designation, { where: { id } });
        return this.findById(id);
    }

    // Soft delete Designation by ID (set isDeleted = true)
    async deleteDesignation(id, type = "soft") {
        return this.delete(id, type);
    }

    // Count the number of Designations (for pagination or other needs)
    async countDesignations(query = {}) {
        return this.count(query);
    }

    // Check if a Designation exists by ID
    async isDesignationExists(id) {
        return this.count({ where: { id } });
>>>>>>> 14038611f552d5a12ec5c5ed9451dbddbf9720ee
    }
}

module.exports = new DesignationRepo();