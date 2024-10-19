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
            console.error(`Error finding designation by ID: ${id}`, error);
            throw new Error("Database error occurred while fetching designation.");
        }
    }

    // Get designations with custom query
    async getDesignations(query) {
        try {
            return await this.findAll(query);
        } catch (error) {
            console.error("Error retrieving designations", error);
            throw new Error("Database error occurred while fetching designations.");
        }
    }

    // Count total designations
    async countDesignation() {
        try {
            return await this.count({ where: { isDeleted: false } });
        } catch (error) {
            console.error("Error counting designations", error);
            throw new Error("Database error occurred while counting designations.");
        }
    }

    // Create new designation
    async createDesignation(data) {
        try {
            return await this.create(data);
        } catch (error) {
            console.error("Error creating designation", error);
            throw new Error("Database error occurred while creating designation.");
        }
    }

    // Check if designation exists
    async isDesignationExists(id) {
        try {
            return await this.findOne({
                where: { id }
            });
        } catch (error) {
            console.error(`Error checking existence of designation ID: ${id}`, error);
            throw new Error("Database error occurred while checking designation existence.");
        }
    }

    // Update designation
    async updateDesignation(data, id) {
        try {
            return await this.update(data, { where: { id } });
        } catch (error) {
            console.error(`Error updating designation ID: ${id}`, error);
            throw new Error("Database error occurred while updating designation.");
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
            console.error(`Error deleting designation ID: ${id}`, error);
            throw new Error("Database error occurred while deleting designation.");
        }
    }
}

module.exports = new DesignationRepo();