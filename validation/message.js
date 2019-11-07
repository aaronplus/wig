const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateMessageInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.message = !isEmpty(data.message) ? data.message : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "name field is required";
  }else if (Validator.isEmpty(data.message)) {
      errors.phone_number = "Message field is required";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};
