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
    const [schedules, sentMessages] = await Promise.all([
      Schedule.find().populate('campaign'),
      SentMessages.find(),
    ]);
    const schedulesData = schedules.map(schedule => {
      const result = {
        ...schedule._doc,
      };
      const sentMessagesStatus = sentMessages.find(sm => {
        if (sm.schedule_id && schedule._id) {
          if (sm.schedule_id.toString() === schedule._id.toString()) {
            return sm;
          }
        }
      });
      if (
        sentMessagesStatus &&
        sentMessagesStatus.message_status &&
        Array.isArray(sentMessagesStatus.message_status)
      ) {
        let queued = 0,
          accepted = 0,
          sent = 0,
          delivered = 0,
          undelivered = 0,
          failed = 0;
        for (let i = 0; i < sentMessagesStatus.message_status.length; i++) {
          if (sentMessagesStatus.message_status[i].status === 'queued') {
            queued++;
          }
          if (sentMessagesStatus.message_status[i].status === 'accepted') {
            accepted++;
          }
          if (sentMessagesStatus.message_status[i].status === 'sent') {
            sent++;
          }
          if (sentMessagesStatus.message_status[i].status === 'delivered') {
            delivered++;
          }
          if (sentMessagesStatus.message_status[i].status === 'undelivered') {
            undelivered++;
          }
          if (sentMessagesStatus.message_status[i].status === 'failed') {
            failed++;
          }
        }
        result.status = {
          queued,
          accepted,
          sent,
          delivered,
          undelivered,
          failed,
        };
      }
      return result;
    });
    return res.json(schedulesData);
  } catch (error) {
    console.log('Error Thrown...', error);
    return res.status(500).json(error);
  }
});

// @route POST api/schedule
// @desc Create Schedule api
// @access Private
router.post('/add', validateToken, async (req, res) => {
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
    isFromMultiple,
  } = req.body;
  try {
    const contacts = await Contact.find({
      campaign,
      status: { $ne: 'DO NOT CALL' },
    });
    if (contacts.length <= 0)
      throw new Error('Contacts are not found against this campaign');
    const totalPhoneNumbers = Array.isArray(contacts)
      ? filterPhoneNumbers(contacts)
      : 0;
    const totalContacts = Array.isArray(contacts) ? contacts.length : 0;
    const scheduleData = new Schedule({
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
      totalPhoneNumbers,
      totalContacts,
      isFromMultiple,
    });
    const results = await scheduleData.save();
    return res.status(200).json(results);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
});

module.exports = router;

function filterPhoneNumbers(contacts) {
  let totalPhoneNumbers = 0;
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i]._doc;
    if (
      contact.phoneOne &&
      contact.phoneOneType &&
      contact.phoneOneType.trim().toLowerCase() === 'mobile'
    ) {
      totalPhoneNumbers++;
    }
    if (
      contact.phoneTwo &&
      contact.phoneTwoType &&
      contact.phoneTwoType.trim().toLowerCase() === 'mobile'
    ) {
      totalPhoneNumbers++;
    }
    if (
      contact.phoneThree &&
      contact.phoneThreeType &&
      contact.phoneThreeType.trim().toLowerCase() === 'mobile'
    ) {
      totalPhoneNumbers++;
    }
    if (
      contact.phoneFour &&
      contact.phoneFourType &&
      contact.phoneFourType.trim().toLowerCase() === 'mobile'
    ) {
      totalPhoneNumbers++;
    }
    if (
      contact.phoneFive &&
      contact.phoneFiveType &&
      contact.phoneFiveType.trim().toLowerCase() === 'mobile'
    ) {
      totalPhoneNumbers++;
    }
    if (
      contact.phoneSix &&
      contact.phoneSixType &&
      contact.phoneSixType.trim().toLowerCase() === 'mobile'
    ) {
      totalPhoneNumbers++;
    }
    if (
      contact.phoneSeven &&
      contact.phoneSevenType &&
      contact.phoneSevenType.trim().toLowerCase() === 'mobile'
    ) {
      totalPhoneNumbers++;
    }
    if (
      contact.phoneEight &&
      contact.phoneEightType &&
      contact.phoneEightType.trim().toLowerCase() === 'mobile'
    ) {
      totalPhoneNumbers++;
    }
    if (
      contact.phoneNine &&
      contact.phoneNineType &&
      contact.phoneNineType.trim().toLowerCase() === 'mobile'
    ) {
      totalPhoneNumbers++;
    }
    if (
      contact.phoneTen &&
      contact.phoneTenType &&
      contact.phoneTenType.trim().toLowerCase() === 'mobile'
    ) {
      totalPhoneNumbers++;
    }
  }
  return totalPhoneNumbers;
}
