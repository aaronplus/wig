const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const ContactSchema = new Schema({
  OWNER_MAILING_NAME: {
    type: String,
    required: false
  },
  SITUS_STREET_ADDRESS: {
    type: String,
    required: false
  },
  SITUS_CITY: {
    type: String,
    required: false
  },
  SITUS_STATE: {
    type: String,
    required: false
  },
  SITUS_ZIP_CODE: {
    type: Number,
    required: false
  },
  MAILING_STREET_ADDRESS:{
    type: String,
    required: false
  },
  MAIL_CITY: {
    type: String,
    default: false
  },
  MAIL_STATE:{
    type: String,
    required: false
  },
  MAIL_ZIP:{
    type: Number,
    required: false
  },
  APN_FORMATTED:{
    type: String,
    required: false
  },
  OT_RECORDING_DATE:{
    type: Date,
    required: false
  },
  OT_DEED_TYPE:{
    type: String,
    required: false
  },
  LMS_RECORDING_DATE:{
    type: Date,
    required: false
  },
  LMS_SALE_PRICE:{
    type: Number,
    required: false
  },
  MARKET_VALUE:{
    type: Number,
    required: false
  },
  EQUITY_VALUE:{
    type: Number,
    required: false
  },
  EQUITY_PERCENTAGE:{
    type: Number,
    required: false
  }
});
module.exports = Contact = mongoose.model("contacts", ContactSchema);
