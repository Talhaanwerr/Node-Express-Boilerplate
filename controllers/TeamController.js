const { Op } = require("sequelize");
const db = require("../models");
const {
  validateCreateTeam,
  validateUpdateTeam,
} = require("../validators/TeamValidator.js");
const BaseController = require("./BaseController.js");
const UserRepo = require("../repos/UserRepo.js");

class TeamController extends BaseController {
  // constructor() {
  //   super();
  // }

  getTeam = async (req, res) => {
    const primaryReporting = req?.user.primaryReporting;
    const customQuery = {
      where: {
        primaryReporting,
      },
      attributes: ["id", "firstName", "lastName", "email", "primaryReporting"],
      include: [
        {
          model: db.Designation,
          as: "designation",
          attributes: ["id", "name"],
        },
      ],
      group: ["designation.name", "User.id"],
    };

    const team = await UserRepo.findAll(customQuery);

    return this.successResponse(res, team, "Team fetched successfully");
  };
}

module.exports = new TeamController();
