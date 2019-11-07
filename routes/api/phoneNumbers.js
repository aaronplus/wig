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
@route: POST api/phoneNumbers/
@description: Add new PhoneNumber
@access: Private
*/

router.post('/', validateToken, async (req, res) => {
  const { errors, isValid } = validatePhoneNumberInput(req.body);
  // Check validation
    if (!isValid) {
      console.log("Validation Errors");
      return res.status(400).json(errors);
    }else {
      try {
        var requestData = new PhoneNumber(req.body);
        const phoneNumbers = await requestData.save();
        return res.json(phoneNumbers);
      } catch (error) {
        console.log("Error in insertQuery",error);
        return res.status(400).json(error);
      }
    }
});

/*
@route: DELETE api/phoneNumbers/:id
@description: delete PhoneNumber by ID
@access: Private
*/

router.delete('/:id', validateToken, async (req, res) => {
  const _id = req.params.id;
  PhoneNumber.findOneAndRemove({ _id }, (err, row) => {
      if (err) {
        res.status(400).json(err);
      }
      if (!row) {
        res.status(404).json({ message: 'Record not found.' });
      }
      res.json({ message: `Phone Number ${row._id} deleted.` });
    });
})

/*
@route: PUT api/phoneNumbers/:id
@description: Update PhoneNumber by ID
@access: Private
*/

router.put('/:id', validateToken, async (req, res) => {
  const _id = req.params.id;
  PhoneNumber.findOneAndUpdate({ _id },
    req.body,
    { new: true },
    (err, row) => {
    if (err) {
      res.status(400).json(err);
    }
    res.json(row);
  });
})






module.exports = router;
