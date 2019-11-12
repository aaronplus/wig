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
    const contacts = await Contact.find({ status: { $ne: 'DO NOT CALL' } });
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
      result.totalPhoneNumbers = Array.isArray(contactsMatched)
        ? filterPhoneNumbers(contactsMatched)
        : 0;
      result.totalContacts = Array.isArray(contactsMatched)
        ? contactsMatched.length
        : 0;
      const sentMessagesStatus = sentMessages.find(sm => {
        if (sm.schedule_id && schedule._id) {
          if (sm.schedule_id.toString() === schedule._id.toString()) {
            return sm;
          }
        }
      });
      result.status = {
        sent:
          sentMessagesStatus && sentMessagesStatus.message_status
            ? sentMessagesStatus.message_status.filter(
                ms => ms.status === 'sent',
              ).length
            : 0,
        delivered:
          sentMessagesStatus && sentMessagesStatus.message_status
            ? sentMessagesStatus.message_status.filter(
                ms => ms.status === 'delivered',
              ).length
            : 0,
        failed:
          sentMessagesStatus && sentMessagesStatus.message_status
            ? sentMessagesStatus.message_status.filter(
                ms => ms.status === 'failed',
              ).length
            : 0,
      };
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
  } = req.body;
  try {
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
    });
    const results = await scheduleData.save();
    return res.status(200).json(results);
  } catch (error) {
    return res.status(400).json(error);
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
