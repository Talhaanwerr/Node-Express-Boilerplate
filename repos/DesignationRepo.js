const { Designation } = require("../models");
const db = require("../models/index");
const BaseRepository = require("./BaseRepo");

class DesignationRepo extends BaseRepository {
    constructor() {
        super(Designation); // Calling parent constructor with Designation model
    }

    // Find designation by ID
    async findById(id) {
        try {
            return await this.findOne({ where: { id } });
        } catch (error) {
            console.error("Error finding designation by ID:", error.message);
            throw new Error("Failed to find designation.");
        }
    }

    // Get designations with custom query
    async getDesignations(query) {
        try {
            return await this.findAll(query);
        } catch (error) {
            console.error("Error getting designations:", error.message);
            throw new Error("Failed to get designations.");
        }
    }

    // Count total designations
    async countDesignation() {
        try {
            return await this.count({ where: { isDeleted: false } });
        } catch (error) {
            console.error("Error counting designations:", error.message);
            throw new Error("Failed to count designations.");
        }
    }

    // Create new designation
    async createDesignation(data) {
        try {
            console.log("Data being inserted:", data);
            return await this.create(data);
        } catch (error) {
            console.error("Error creating designation:", error.message);


            if (error.name === 'SequelizeValidationError') {
                return { status: false, message: "Validation error: " + error.message, data: null };
            }


            throw new Error("Database error occurred: " + error.message);
        }
    }

    // Check if designation exists
    async isDesignationExists(id) {
        try {
            return await this.findOne({
                where: { id }
            });
        } catch (error) {
            console.error("Error checking if designation exists:", error.message);
            throw new Error("Failed to check designation existence.");
        }
    }

    // Update designation
    async updateDesignation(data, id) {
        try {
            return await this.update(data, { where: { id } });
        } catch (error) {
            console.error("Error updating designation:", error.message);
            throw new Error("Failed to update designation.");
        }
    }

    // Soft delete or hard delete designation
    async deleteDesignation(id, type) {
        try {
            if (type === "soft") {
                return await this.update({ isDeleted: true }, { where: { id } });
            } else {
                return await this.destroy({ where: { id } });
            }
        } catch (error) {
            console.error("Error deleting designation:", error.message);
            throw new Error("Failed to delete designation.");
        }
    }
}

module.exports = new DesignationRepo();