const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validatePhoneNumberInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.phone_number = !isEmpty(data.phone_number) ? data.phone_number : "";
  data.type = !isEmpty(data.type) ? data.type : "";
  data.voice_forward_number = !isEmpty(data.voice_forward_number) ? data.voice_forward_number : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "name field is required";
  }else if (Validator.isEmpty(data.phone_number)) {
      errors.phone_number = "phone_number field is required";
  }else if (Validator.isEmpty(data.type)) {
      errors.type = "type field is required";
  }else if (Validator.isEmpty(data.voice_forward_number)) {
      errors.voice_forward_number = "voice_forward_number field is required";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};
