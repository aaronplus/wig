const { Schema, model } = require('mongoose');

const messageSchema = new Schema(
  {
    message: {
      type: String,
    },
    sid: {
      type: String,
    },
    received: {
      type: Boolean,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const conversationSchema = new Schema(
  {
    from_name: {
      type: String,
    },
    from: {
      type: String,
    },
    to: {
      type: String,
    },
    messages: [messageSchema],
  },
  {
    timestamps: true,
  },
);

module.exports = model('Conversation', conversationSchema);
