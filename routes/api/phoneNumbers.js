const router = require('express').Router();

const validateToken = require('../validateToken').validateToken;

const PhoneNumber = require('../../models/PhoneNumber');
const validatePhoneNumberInput = require("../../validation/phoneNumber");

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

/*
** Description: Create new PhoneNumber
** Method: Post
*/

router.get('/add', validateToken, async (req, res) => {
  const { errors, isValid } = validatePhoneNumberInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }else {
      try {
        const phoneNumbers = await PhoneNumber.save({...req.body});
        return res.json(phoneNumbers);
      } catch (error) {
        return res.status(400).json(error);
      }
    }


});

module.exports = router;
