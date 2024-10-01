const {generateResponse} = require("../utils/utils.js");

class BaseController {
  successResponse(res, data, message = null) {
    return res.status(200).json(generateResponse(true, message, data));
  }

  errorResponse(res, message, status) {
    return res.status(status).json(generateResponse(false, message));
  }

  validationErrorResponse(res, message) {
    return res.status(422).json(generateResponse(false, message));
  }

  serverErrorResponse(res, message) {
    return res.status(500).json(generateResponse(false, message));
  }
}

module.exports = BaseController;
