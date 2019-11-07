const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const validateToken = require('../validateToken').validateToken;
// Load input validation
// const validateLoginInput = require("../../validation/login");
// Load User model
const Schedule = require('../../models/Schedule');
const SentMessages = require('../../models/SentMessages');
const Contact = require('../../models/Contact');

router.get('/all', validateToken, async (req, res) => {
  try {
    const schedules = await Schedule.find().populate('campaign');
    const sentMessages = await SentMessages.find();
    const contacts = await Contact.find();
    const schedulesData = schedules.map(schedule => ({
      ...schedule._doc,
      total: contacts.filter(
        contact =>
          contact.campaign.toString() === schedule.campaign._id.toString(),
      ).length,
      sent: sentMessages.find(
        sm => sm.schedule_id.toString() === schedule._id.toString(),
      )
        ? sentMessages.find(
            sm => sm.schedule_id.toString() === schedule._id.toString(),
          ).sent
        : 0,
    }));
    return res.json(schedulesData);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// @route POST api/schedule
// @desc Create Schedule api
// @access Private
router.post('/add', validateToken, (req, res) => {
  // return res.json(req.body);
  const {
    campaign,
    type,
    start_date,
    end_date,
    day_limit,
    start_time,
    end_time,
    days,
    time_zone,
    message,
    phone_number,
  } = req.body;
  var scheduleData = new Schedule({
    campaign,
    type,
    start_date,
    end_date,
    day_limit,
    start_time,
    end_time,
    days,
    time_zone,
    message,
    phone_number,
  })
    .save()
    .then(function(results) {
      return res.status(200).json(results);
    })
    .catch(function(err) {
      return res.status(400).json(err);
    });
});

module.exports = router;
