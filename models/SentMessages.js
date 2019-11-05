const { Schema, model } = require("mongoose");

const sentMessageSchema = new Schema(
  {
    schedule_id: {
      type: Schema.Types.ObjectId,
      ref: "Schedule",
    },
    pages: {
      type: Number,
    },
    message_status: [
      {
        to: {
          type: String,
        },
        status: {
          type: String,
        },
        sid: {
          type: String,
        },
      },
    ],
    sent_messages: [
      {
        date: {
          type: Date,
        },
        sent: {
          type: Number,
        },
      },
    ],
  },
  { toJSON: true, toObject: true }
);

sentMessageSchema.virtual("sent", function getSent() {
  return this.sent_messages.reduce((acc, item) => acc + item.sent, 0);
});

module.exports = model("SentMessages", sentMessageSchema);
