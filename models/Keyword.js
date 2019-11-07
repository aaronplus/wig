const { Schema, model } = require('mongoose');

const keywordSchema = new Schema({
  keyword: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: Boolean,
  },
  priority: {
    type: Number,
  },
  status: {
    type: Boolean,
  },
});

module.exports = model('Keyword', keywordSchema);
