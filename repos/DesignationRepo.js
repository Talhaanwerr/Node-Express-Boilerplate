const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class DesignationRepo extends BaseRepository {
    model;
    constructor() {
        super(db.Designation);
        this.model = db.Announcement;
    }

    async createDesignation(designation) {
            return this.create(designation);
        }
        // for find
    async findDesignation(searchQuery) {
        if (searchQuery && Object.keys(searchQuery).length > 0) {
            return this.findAll({
                where: searchQuery
            });
        }
        return this.findAll();
    }

    // for update
    async updateDesignation(designation, id) {
        await this.update(designation, { where: { id } });
        return this.findOne({ where: { id } });
    }

    // for delete
    //   async deleteDesignation(id) {
    //     await this.update({ isDeleted: true }, { where: { id } });
    //     return `Designation with ID ${id} deleted successfully.`;
    // }


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