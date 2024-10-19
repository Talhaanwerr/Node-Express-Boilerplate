// validators/DesignationValidator.js

const validateCreateDesignation = (data) => {
    if (!data.designation_name || typeof data.designation_name !== 'string') {
        return { status: false, message: "Designation name is required and must be a string." };
    }
    return { status: true, message: "Validation successful." };
};

const validateUpdateDesignation = (data) => {
    if (!data.designation_name || typeof data.designation_name !== 'string') {
        return { status: false, message: "Designation name is required and must be a string." };
    }
    return { status: true, message: "Validation successful." };
};

module.exports = {
    validateCreateDesignation,
    validateUpdateDesignation,
};