function validateCreateLeave(data) {
    if (!data.type_of_leave) {
      return { status: false, message: "Leave type is required" };
    }
    if (typeof data.available !== "number" || data.available < 0) {
      return { status: false, message: "Available leaves must be a positive number" };
    }
    return { status: true };
  }
  
  function validateUpdateLeave(data) {
    if (data.available && typeof data.available !== "number") {
      return { status: false, message: "Available leaves must be a number" };
    }
    if (data.used && typeof data.used !== "number") {
      return { status: false, message: "Used leaves must be a number" };
    }
    return { status: true };
  }
  
  module.exports = {
    validateCreateLeave,
    validateUpdateLeave,
  };
  