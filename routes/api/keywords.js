const router = require('express').Router();

const Keyword = require('../../models/Keyword');

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

module.exports = router;
