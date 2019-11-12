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
    const schedulesData = schedules.map(schedule => {
      const result = {
        ...schedule._doc,
      };
      const contactsMatched = contacts.filter(contact => {
        if (contact.campaign && schedule.campaign && schedule.campaign._id) {
          if (
            contact.campaign.toString() === schedule.campaign._id.toString()
          ) {
            return true;
          }
        }
        return false;
      });
      const sentMessagesStatus = sentMessages.find(sm => {
        if (sm.schedule_id && schedule._id) {
          if (sm.schedule_id.toString() === schedule._id.toString()) {
            return sm;
          }
        }
      });
      result.total = Array.isArray(contactsMatched)
        ? contactsMatched.length
        : 0;
      result.sent = sentMessagesStatus ? sentMessagesStatus.sent : 0;
      return result;
    });
    return res.json(schedulesData);
  } catch (error) {
    console.log('Error Thrown...', error);
    return res.status(500).json(error);
  }
});

router.get('/all/status', async (req, res) => {
  try {
    const [schedules, sentMessages, contacts] = await Promise.all([
      Schedule.find().populate('campaign'),
      SentMessages.find(),
      Contact.find(),
    ]);
    const schedulesData = schedules.map(schedule => {
      const result = {
        ...schedule._doc,
      };
      const contactsMatched = contacts.filter(contact => {
        if (contact.campaign && schedule.campaign && schedule.campaign._id) {
          if (
            contact.campaign.toString() === schedule.campaign._id.toString()
          ) {
            return true;
          }
        }
        return false;
      });
      const sentMessagesStatus = sentMessages.find(sm => {
        if (sm.schedule_id && schedule._id) {
          if (sm.schedule_id.toString() === schedule._id.toString()) {
            return sm;
          }
        }
      });
      result.total = Array.isArray(contactsMatched)
        ? contactsMatched.length
        : 0;
      result.sent = sentMessagesStatus ? sentMessagesStatus.sent : 0;
      result.sentMessagesStatus = sentMessagesStatus;
      return result;
    });
    return res.json(schedulesData);
  } catch (error) {
    console.log('Error thrown...', error);
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
