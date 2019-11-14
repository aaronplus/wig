const router = require('express').Router();
const validateToken = require('../validateToken').validateToken;
const Keyword = require('../../models/Keyword');
const validateKeywordInput = require("../../validation/keywords");

router.post('/add', async (req, res) => {
  const { keyword, type, priority, status } = req.body;
  try {
    const keywordResult = await Keyword.create({
      keyword,
      type,
      priority,
      status,
    });
    return res.json(keyword);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});

/*
@route: GET api/keywords/all
@description: Add new Keyword
@access: Private
*/
router.get('/all', validateToken, async (req, res) => {
  try {
    const Keywords = await Keyword.find().sort({'priority':1});
    return res.json(Keywords);
  } catch (error) {
    return res.status(400).json(error);
  }
});


/*
@route: POST api/keywords/
@description: Add new Keyword
@access: Private
*/

router.post('/', validateToken, async (req, res) => {
  const { errors, isValid } = validateKeywordInput(req.body);
  // Check validation
    if (!isValid) {
      console.log("Validation Errors");
      return res.status(400).json(errors);
    }else {
      try {
        var requestData = new Keyword(req.body);
        const Keywords = await requestData.save();
        return res.json(Keywords);
      } catch (error) {
        console.log("Error in insertQuery",error);
        return res.status(400).json(error);
      }
    }
});

/*
@route: DELETE api/keywords/:id
@description: delete Keyword by ID
@access: Private
*/

router.delete('/:id', validateToken, async (req, res) => {
  const _id = req.params.id;
  Keyword.findOneAndRemove({ _id }, (err, row) => {
      if (err) {
        res.status(400).json(err);
      }
      if (!row) {
        res.status(404).json({ message: 'Record not found.' });
      }
      res.json({ message: `Keyword deleted.` });
    });
})

/*
@route: PUT api/keyword/:id
@description: Update Keyword by ID
@access: Private
*/

router.put('/:id', validateToken, async (req, res) => {
  const _id = req.params.id;
  Keyword.findOneAndUpdate({ _id },
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
