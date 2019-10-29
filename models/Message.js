const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const MessageSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    required: false
  },
  message:{
    type: String,
    required: false
  },
  created: {
    type: Date,
    default: Date.now
  }
});
module.exports = Message = mongoose.model("messages", MessageSchema);
