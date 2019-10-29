const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateLoginInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.campaign = !isEmpty(data.campaign) ? data.campaign : "";
  data.mimetype = !isEmpty(data.mimetype) ? data.mimetype : "";
// campaign checks
  if (Validator.isEmpty(data.campaign)) {
    errors.campaign = "Campaign field is required";
  }
  if (Validator.isEmpty(data.mimetype)) {
    errors.file = "File field is required";
  }else if (data.mimetype && data.mimetype !== 'text/csv') {
    errors.file = "Invalid file type, please upload csv file";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};
