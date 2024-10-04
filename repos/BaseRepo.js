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
    condition.where = {
      ...condition?.where,
      isDeleted: false,
    };
    if (!condition.order) {
      condition.order = [["id", "desc"]];
    }
    return this.model.findAll(condition);
  }

  async count(condition) {
    return this.model.count({ where: condition });
  }

  async update(data, condition) {
    return this.model.update(data, { where: condition });
  }

  async softDelete(id) {
    return this.model.update(
      {
        isDeleted: true,
      },
      {
        where: {
          id,
        },
      }
    );
  }

  async bulkCreate(data) {
    return this.model.bulkCreate(data);
  }

  async delete(id, type) {
    if (type === "soft") {
      return this.model.softDelete(id);
    } else if (type === "hard") {
      return this.model.destroy({
        where: { id },
      });
    }
  }
};
