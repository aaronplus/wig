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
