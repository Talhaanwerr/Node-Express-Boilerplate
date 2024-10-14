const role = require("../models/role");

module.exports = class BaseRepository {
  model;
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return this.model.create(data);
  }

  async findOne(condition) {
    condition.isDeleted = false;
    return this.model.findOne({ where: condition });
  }

  async findOneWithInclude(searchQuery) {
    return this.model.findOne(searchQuery);
  }

  async findAll(condition = {}) {
    return this.model.findAll(condition);
  }

  async softDelete(roleId) {
    return this.model.update(
      {
        isDeleted: true,
      },
      {
        where: {
          roleId,
        },
      }
    );
  }

  async count(condition) {
    return this.model.count({ where: condition });
  }

  async update(data, condition) {
    return this.model.update(data, { where: condition });
  }

  async bulkCreate(data, config) {
    return this.model.bulkCreate(data, (config = {}));
  }

  async delete(roleId, type) {
    if (type === "soft") {
      return this.softDelete(roleId);
    } else if (type === "hard") {
      return this.model.destroy({
        where: { roleId: roleId },
      });
    }
  }
};
