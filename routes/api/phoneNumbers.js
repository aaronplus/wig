const router = require('express').Router();

const validateToken = require('../validateToken').validateToken;

const PhoneNumber = require('../../models/PhoneNumber');

/**
 * Get all Messages
 */
router.get('/all', validateToken, async (req, res) => {
  try {
    const phoneNumbers = await PhoneNumber.find();
    return res.json(phoneNumbers);
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
