const { UserPermission } = require("../models");
const db = require("../models/index");
const BaseRepository = require("./BaseRepo");

class UserPermissionRepo extends BaseRepository {
    constructor() {
        super(UserPermission);
    }

    async assignPermissions(userId, permissions) {
        const uniquePermissions = [...new Set(permissions)];
        const userPermissions = uniquePermissions.map((permissionId) => ({
            userId,
            permissionId,
        }));
        return this.bulkCreate(userPermissions, {
            ignoreDuplicates: true,
        });
    }

    async getUsersWithPermissions() {
        return await this.findAll({
            include: [{
                    model: db.User,
                    as: "User",
                    attributes: ["username", "email"],
                },
                {
                    model: db.Permission,
                    as: "Permission",
                    attributes: ["name", "module"],
                },
            ],
        });
    }

    async findById(id) {
        return this.findAll({ id });
    }

    async isUserPermissionExists(userId, permissionId) {
        return this.findOne({
            where: {
                userId,
                permissionId,
            },
        });
    }

    async findOneWithInclude(userId) {
        return this.findAll({
            where: { userId: userId },
            include: [{
                    model: db.User,
                    as: "User",
                    attributes: ["username", "email"],
                },
                {
                    model: db.Permission,
                    as: "Permission",
                    attributes: ["name", "module"],
                },
            ],
        });
    }

    async updateUserPermission(data, userId, permissionId) {
        return this.update(data, {
            where: {
                userId,
                permissionId,
            },
        });
    }
}

module.exports = new UserPermissionRepo();