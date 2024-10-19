// repos/DesignationRepo.js
const Designation = require('../models/Designation');

class DesignationRepo {
    // Find designation by ID
    static async findById(id) {
        return await Designation.findByPk(id);
    }

    // Get designations with custom query
    static async getDesignations(query) {
        return await Designation.findAll(query);
    }

    // Count total designations
    static async countDesignation() {
        return await Designation.count({ where: { isDeleted: false } });
    }

    // Create new designation
    static async createDesignation(data) {
        return await Designation.create(data);
    }

    // Check if designation exists
    static async isDesignationExists(id) {
        const designation = await Designation.findByPk(id);
        return !!designation;
    }

    // Update designation
    static async updateDesignation(data, id) {
        await Designation.update(data, { where: { id } });
        return this.findById(id);
    }

    // Delete designation
    static async deleteDesignation(id, type) {
        if (type === "soft") {
            return await Designation.update({ isDeleted: true }, { where: { id } });
        } else {
            return await Designation.destroy({ where: { id } });
        }
    }
}

module.exports = DesignationRepo;