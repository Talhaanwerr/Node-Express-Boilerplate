module.exports = class BaseRepository {
  model;
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return this.model.create(data);
  }

  async findOne(condition) {
    return this.model.findOne({ where: condition });
  }

  async findOneWithInclude(searchQuery) {
    return this.model.findOne(searchQuery);
  }

  async findAll(condition = {}) {
    return this.model.findAll(condition);
  }

  async findByPk(id) {
    return this.model.findByPk(id);
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

  async count(condition) {
    return this.model.count({ where: condition });
  }

  async update(data, condition) {
    return this.model.update(data, { where: condition });
  }

  async bulkCreate(data, config) {
    return this.model.bulkCreate(data, (config = {}));
  }

  async delete(id, type) {
    if (type === "soft") {
      return this.softDelete(id);
    } else if (type === "hard") {
      return this.model.destroy({
        where: { id },
      });
    }
  }
};
