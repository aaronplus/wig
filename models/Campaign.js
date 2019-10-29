const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const CampaignSchema = new Schema({
  campaign: {
    type: String,
    required: true
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});
module.exports = Campaign = mongoose.model("campaigns", CampaignSchema);
