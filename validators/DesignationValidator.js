// validators/DesignationValidator.js

const validateCreateDesignation = (data) => {
    if (!data.designation_name || typeof data.designation_name !== 'string') {
        return { status: false, message: "Designation name is required and must be a string." };
    }
    if (data.designation_name.length < 3) {
        return { status: false, message: "Designation name must be at least 3 characters long." };
    }
    return { status: true, message: "Validation successful." };
};

const validateUpdateDesignation = (data) => {
    // Allow designation_name to be optional in updates
    if (data.designation_name && typeof data.designation_name !== 'string') {
        return { status: false, message: "Designation name must be a string." };
    }
    if (data.designation_name && data.designation_name.length < 3) {
        return { status: false, message: "Designation name must be at least 3 characters long." };
    }
    return { status: true, message: "Validation successful." };
};

module.exports = {
    validateCreateDesignation,
    validateUpdateDesignation,
};