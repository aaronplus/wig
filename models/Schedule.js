const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create Schema
const ScheduleSchema = new Schema({
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'campaigns',
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  start_date: {
    type: Date,
    required: false,
  },
  end_date: {
    type: Date,
    required: false,
  },
  day_limit: {
    type: String,
    required: false,
  },
  start_time: {
    type: String,
    required: false,
  },
  end_time: {
    type: String,
    required: false,
  },
  days: [
    {
      type: String,
      required: false,
    },
  ],
  time_zone: {
    type: String,
    required: false,
  },
  message: {
    type: String,
    required: false,
  },
  phone_number: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  totalPhoneNumbers: {
    type: Number,
    required: true,
  },
  totalContacts: {
    type: Number,
    required: true,
  },
  // fail_message:{
  //   type: String,
  //   required: false
  // },
  created: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Schedule = mongoose.model('schedules', ScheduleSchema);
