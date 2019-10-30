const router = require('express').Router();

const validateToken = require('../validateToken').validateToken;

const Campaign = require('../../models/Campaign');

/**
 * Get all Campaigns
 */
router.get('/all', validateToken, async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    return res.json(campaigns);
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
