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
    status: {
      type: String,
      enum: ['PASS', 'FAIL', 'REVIEW'],
    },
  },
  { timestamps: true },
);

const conversationSchema = new Schema(
  {
    contact: {
      type: Schema.Types.ObjectId,
      ref: 'contacts',
    },
    from: {
      type: String,
    },
    to: {
      type: String,
    },
    messages: [messageSchema],
    status: {
      type: String,
      enum: ['REVIEW', 'PASS', 'FAIL'],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = model('Conversation', conversationSchema);
