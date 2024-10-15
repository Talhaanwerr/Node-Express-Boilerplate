const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class DesignationRepo extends BaseRepository {
    constructor() {
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
    }
}

module.exports = new DesignationRepo();