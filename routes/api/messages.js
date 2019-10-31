const router = require('express').Router();

const validateToken = require('../validateToken').validateToken;

const Message = require('../../models/Message');

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

module.exports = router;
