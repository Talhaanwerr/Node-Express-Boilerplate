const { validateCreateUser } = require("../validators/UserValidator.js");
const BaseController = require("./BaseController.js");

class UserController extends BaseController {
  constructor() {
    super();
    this.saveUser = this.saveUser.bind(this);
  }

  async saveUser(req, res) {
  }
}

module.exports = new UserController();
