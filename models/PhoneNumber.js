const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const PhoneNumberSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type:{
    type: String,
    required: true
  },
  phone_number:{
    type: String,
    required: false
  },
  voice_forward_number:{
    type: String,
    required: false
  },
  created: {
    type: Date,
    default: Date.now
  }
});
module.exports = PhoneNumber = mongoose.model("phone_numbers", PhoneNumberSchema);
