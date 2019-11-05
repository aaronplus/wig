const router = require('express').Router();
const mongoose = require('mongoose');
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

// @route GET api/campaign/list
// @desc Get Campaign List
// @access Private
router.get("/list", validateToken, async(req, res) => {
  var userId = req.decoded.id;
  try {
    let campaigns = await Campaign.find({userId: mongoose.Types.ObjectId(userId)});
    return res.json(campaigns);
  } catch (e) {
    return res.status(400).json(error);
  }

});

/**
 * description:Verify Duplicate Campaign
 * Params: campaign
 *METHOD: POST
  */
router.post('/verify', validateToken, async (req, res) => {
  if (!req.body.campaign) {
    return res.status(400).json({message: "Campaign param is required"});
  }
  let campaign = req.body.campaign;
  Campaign.findOne({campaign}, function(err, results){
    if (results) {
      return res.status(400).json({message:"A campaign with this name exist. Please enter a different campaign name"});
    }else {
      return res.status(200).json({message:"success"});
    }
  });
});

module.exports = router;
