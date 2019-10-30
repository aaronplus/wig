const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const validateToken = require("../validateToken").validateToken;
// Load input validation
// const validateLoginInput = require("../../validation/login");
// Load User model
const Campaign = require("../../models/Campaign");

// @route GET api/campaign/list
// @desc Get Campaign List
// @access Private
router.get("/list", validateToken, async(req, res) => {
  var userId = req.decoded.id;
  let campaigns = await Campaign.find({userId: mongoose.Types.ObjectId(userId)});
  return res.json(campaigns);
});

module.exports = router;
