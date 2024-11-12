const AnnouncementRepo = require("../repos/AnnouncementRepo.js");
const db = require("../models/index");
const {
  validateCreateAnnouncement,
  validateUpdateAnnouncement,
} = require("../validators/AnnouncementValidator.js");
const BaseController = require("./BaseController.js");
const UserProfileRepo = require("../repos/UserProfileRepo.js");

class AnnouncementController extends BaseController {
  // constructor() {
  //   super();
  // }

  createAnnouncement = async (req, res) => {
    const validationResult = validateCreateAnnouncement(req.body);

    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const announcement = await AnnouncementRepo.createAnnouncement(req?.body);

    return this.successResponse(
      res,
      announcement,
      "Announcement created successfully"
    );
  };

  getAnnouncement = async (req, res) => {
    const {
      sortBy = "id",
      sortOrder = "DESC",
      page = 1,
      limit = 10,
      search = "",
      filterByName,
    } = req.query;

    const skip = (page - 1) * limit;

    const searchParams = {};

    if (search) {
      searchParams[db.Sequelize.Op.or] = [
        { name: { [db.Sequelize.Op.like]: `%${search}%` } },
      ];
    }
    if (filterByName) {
      searchParams.name = {
        [db.Sequelize.Op.like]: `%${filterByName}%`,
      };
    }

    searchParams.isDeleted = false;

    const condition = {
      order: [[sortBy, sortOrder]],
      limit: parseInt(limit),
      offset: skip,
      where: searchParams,
    };

    const announcement = await AnnouncementRepo.getAnnouncement(condition);
    return this.successResponse(res, announcement, "Getting All Announcements");
  };

  getAnnouncementById = async (req, res) => {
    const announcement = await AnnouncementRepo.findAnnouncements(
      req.params.id
    );
    if (!announcement) {
      return this.errorResponse(res, "Announcement not found", 404);
    }
    return this.successResponse(res, announcement, "Getting Announcement");
  };

  updateAnnouncement = async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    const announcement = await AnnouncementRepo.updateAnnouncement(body, id);

    return this.successResponse(
      res,
      announcement,
      "Announcement updated successfully"
    );
  };

  getBirthday = async (req, res) => {
    const today = new Date();
    const currentMonthDay = today.toISOString().slice(5, 10);
    const date30DaysLater = new Date(today);
    date30DaysLater.setDate(today.getDate() + 30);
    const monthDay30DaysLater = date30DaysLater.toISOString().slice(5, 10);

    const users = await UserProfileRepo.getUserProfiles({
      attributes: ["dateOfBirth"],
      where: db.sequelize.where(
        db.sequelize.fn(
          "DATE_FORMAT",
          db.sequelize.col("dateOfBirth"),
          "%m-%d"
        ),
        {
          [db.Sequelize.Op.between]: [currentMonthDay, monthDay30DaysLater],
        }
      ),
      include: [
        {
          model: db.User,
          as: "user",
          attributes: ["firstName", "lastName", "email"],
        },
      ],
    });

    const userResponse = users.map((user) => {
      return {
        firstName: user.user.firstName,
        lastName: user.user.lastName,
        email: user.user.email,
        dateOfBirth: user.dateOfBirth.slice(5, 10),
      };
    });

    return this.successResponse(
      res,
      userResponse,
      "Birthdays retrieved successfully"
    );
  };
}

module.exports = new AnnouncementController();
