const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateKeywordInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.keyword = !isEmpty(data.keyword) ? data.keyword : "";
  data.type = !isEmpty(data.type) ? data.type : "";
  data.priority = !isEmpty(data.priority) ? data.priority : "";
  data.status = !isEmpty(data.status) ? data.status : "";

  if (Validator.isEmpty(data.keyword)) {
    errors.keyword = "keyword field is required";
  }
  // else if (!Validator.isEmpty(data.type) && (!(data.type == true || data.type == false))) {
  //   errors.type = "type field must be in bollean";
  // }
  // else if (!Validator.isEmpty(data.priority) && (!(data.priority == true || data.priority == false))) {
  //   errors.priority = "priority field must be in Number";
  // }
  // else if (!Validator.isEmpty(data.status) && (!(data.status == true || data.status == false))) {
  //   errors.status = "status field must be in bollean";
  // }
return {
    errors,
    isValid: isEmpty(errors)
  };
};
