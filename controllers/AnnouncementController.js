const AnnouncementRepo = require("../repos/AnnouncementRepo.js");
const db = require("../models/index");
const {
  validateCreateAnnouncement,
  validateUpdateAnnouncement,
} = require("../validators/AnnouncementValidator.js");
const BaseController = require("./BaseController.js");

class AnnouncementController extends BaseController {
  constructor() {
    super();
  }

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
}





module.exports = new AnnouncementController();
