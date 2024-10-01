module.exports = class BaseRepository {
    model;
    constructor(model) {
      this.model = model;
    }
  
    async create(data) {
      return this.model.create(data);
    }
  
    async findOne(condition) {
      return this.model.findOne({where: condition});
    }
  
    async findOneWithInclude(searchQuery) {
      return this.model.findOne(searchQuery);
    }
  
    async findAll(condition = null) {
      if (condition) {
        return this.model.findAll(condition);
      }
      return this.model.findAll();
    }
  
    async count(condition) {
      return this.model.count({where: condition});
    }
  
    async update(data, condition) {
      return this.model.update(data, {where: condition});
    }
  
    async bulkCreate(data) {
      return this.model.bulkCreate(data);
    }
  
    async delete(data) {
      return this.model.destroy(data);
    }
  }
  