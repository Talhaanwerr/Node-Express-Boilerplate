const AnnouncementRepo = require("../repos/AnnouncementRepo.js");
const {
  validateCreateAnnouncement,
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

    const announcement = await AnnouncementRepo.createAnnouncement(req.body);

    return this.successResponse(res, announcement, "Announcement created successfully");
  };
}

module.exports = new AnnouncementController();
