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

  async bulkCreate(data) {
    return this.model.bulkCreate(data);
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

  async runTransaction(callback) {
    const transaction = await this.model.sequelize.transaction();
    try {
      const result = await callback(transaction);
      await transaction.commit();
      return result;
    } catch (error) {
      await transaction.rollback();
      throw new Error("Transaction failed: " + error.message);
    }
  }
};
