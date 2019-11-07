const router = require('express').Router();

const validateToken = require('../validateToken').validateToken;
const validateMessageInput = require("../../validation/message");

const Message = require('../../models/Message');
const mongoose = require('mongoose');
/**
 * Get all Messages
 */
router.get('/all', validateToken, async (req, res) => {
  try {
    const messages = await Message.find();
    return res.json(messages);
  } catch (error) {
    return res.status(400).json(error);
  }
});

/*
@route: POST api/messages/
@description: Add new message
@access: Private
*/

router.post('/', validateToken, async (req, res) => {
  var userId = req.decoded.id;
  const { errors, isValid } = validateMessageInput(req.body);
  // Check validation
    if (!isValid) {
      console.log("Validation Errors");
      return res.status(400).json(errors);
    }else {
      try {
        req.body['userId'] = mongoose.Types.ObjectId(userId);
        var requestData = new Message(req.body);
        const data = await requestData.save();
        return res.json(data);
      } catch (error) {
        console.log("Error in insertQuery",error);
        return res.status(400).json(error);
      }
    }
});

/*
@route: DELETE api/messages/:id
@description: delete messages by ID
@access: Private
*/

router.delete('/:id', validateToken, async (req, res) => {
  const _id = req.params.id;
  Message.findOneAndRemove({ _id }, (err, row) => {
      if (err) {
        res.status(400).json(err);
      }
      if (!row) {
        res.status(404).json({ message: 'Record not found.' });
      }
      res.json({ message: `Message deleted. successfully` });
    });
})

/*
@route: PUT api/messages/:id
@description: Update message by ID
@access: Private
*/

router.put('/:id', validateToken, async (req, res) => {
  var userId = req.decoded.id;
  const _id = req.params.id;
  req.body['userId'] = mongoose.Types.ObjectId(userId);
  Message.findOneAndUpdate({ _id },
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
