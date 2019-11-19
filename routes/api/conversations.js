const router = require('express').Router();
const twilio = require('twilio');
const axios = require('axios');

const validateToken = require('../validateToken').validateToken;
const { AREA_CODE } = require('../../config/keys');

const User = require('../../models/User');
const Contact = require('../../models/Contact');
const Conversation = require('../../models/Conversation');
const SentMessages = require('../../models/SentMessages');
const Keyword = require('../../models/Keyword');

router.post('/sms', async (req, res) => {
  const messageReceived = req.body;
  console.log('Received Message: ', messageReceived);
  let { From, To, MessageSid, Body } = messageReceived;
  const { CallSid, RecordingUrl, RecordingSid } = messageReceived;
  if (CallSid) {
    const accountSid = process.env.ACCOUNT_SID;
    const authToken = process.env.AUTH_TOKEN;
    const client = twilio(accountSid, authToken);
    const call = await client.calls(CallSid).fetch();
    From = call.from;
    To = call.to;
    MessageSid = RecordingSid;
    Body = RecordingUrl;
  }
  const conversationExists = await Conversation.findOne({
    from: From,
    to: To,
  }).populate({
    path: 'contact',
    populate: { path: 'campaign' },
  });
  const keywords = await Keyword.find();
  let Pass = false;
  let Fail = false;
  if (!CallSid) {
    for (let i = 0; i < keywords.length; i++) {
      console.log('Keywords', keywords[i].keyword);
      if (Body.toLowerCase().includes(keywords[i]._doc.keyword.toLowerCase())) {
        if (keywords[i]._doc.type) {
          Pass = true;
        } else {
          Fail = true;
        }
      }
    }
  }
  let status = 'REVIEW';
  if (Pass && !Fail) status = 'PASS';
  if (!Pass && Fail) status = 'FAIL';
  const newMessage = {
    message: Body,
    sid: MessageSid,
    received: true,
    status,
    isVoicemail: CallSid ? true : false,
  };
  console.log('new message', newMessage);
  if (conversationExists) {
    conversationExists.messages.push(newMessage);
    if (Fail) {
      await Contact.findByIdAndUpdate(conversationExists.contact._id, {
        $set: { status: 'DO NOT CALL' },
      });
    }
    const conversation = await conversationExists.save();
    global.socket.emit('new_sms', conversation);
  } else {
    const phone = `${From}`.substring(AREA_CODE.toString().length + 1);
    const contact = await Contact.findOne({
      $or: [
        { phoneOne: phone },
        { phoneTwo: phone },
        { phoneThree: phone },
        { phoneFour: phone },
        { phoneFive: phone },
        { phoneSix: phone },
        { phoneSeven: phone },
        { phoneEight: phone },
        { phoneNine: phone },
        { phoneTen: phone },
      ],
    });
    const newConv = {
      from: From,
      to: To,
      status,
      messages: [newMessage],
    };
    if (contact) {
      console.log('Contact: ', JSON.stringify(contact, undefined, 2));
      newConv.contact = contact._id;
      if (!Pass) {
        await Contact.findByIdAndUpdate(contact._id, {
          $set: { status: 'DO NOT CALL' },
        });
      }
    }
    const conv = await Conversation.create(newConv);
    const conversation = await Conversation.populate(conv, {
      path: 'contact',
      populate: { path: 'campaign' },
    });
    global.socket.emit('new_sms', conversation);
  }
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end('<Response></Response>');
});

router.post('/sms/callback', async (req, res) => {
  const messageStatus = req.body;
  const { SmsSid, SmsStatus } = messageStatus;
  console.log('Message Status: ', new Date().toISOString());
  console.log(JSON.stringify(messageStatus, undefined, 2));
  try {
    if (SmsStatus && SmsSid) {
      const sentMessagesStatus = await SentMessages.findOneAndUpdate(
        { 'message_status.sid': SmsSid },
        { $set: { 'message_status.$.status': SmsStatus } },
        { new: true },
      );
      const data = {
        schedule_id: sentMessagesStatus.schedule_id,
        status: {
          sent:
            sentMessagesStatus && sentMessagesStatus.message_status
              ? sentMessagesStatus.message_status.filter(
                  ms => ms.status === 'sent',
                ).length
              : 0,
          delivered:
            sentMessagesStatus && sentMessagesStatus.message_status
              ? sentMessagesStatus.message_status.filter(
                  ms => ms.status === 'delivered',
                ).length
              : 0,
          failed:
            sentMessagesStatus && sentMessagesStatus.message_status
              ? sentMessagesStatus.message_status.filter(
                  ms => ms.status === 'failed',
                ).length
              : 0,
        },
      };
      global.socket.emit('status_update', data);
    }
  } catch (error) {
    console.log('Error: ', error);
  }
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end('<Response></Response>');
});

router.post('/voicemail', async (req, res) => {
  console.log('Origin: ', req.hostname);
  const VoiceResponse = twilio.twiml.VoiceResponse;
  const response = new VoiceResponse();
  response.say('Please leave your message after the beep.');
  response.record({
    timeout: 10,
    recordingStatusCallback: `https://${req.hostname}/api/twilio/sms`,
    recordingStatusCallbackEvent: 'completed',
  });

  res.send(response.toString());
});

router.post('/reply/:conversationId', async (req, res) => {
  const { conversationId } = req.params;
  const { message } = req.body;
  try {
    const conversation = await Conversation.findById(conversationId).populate({
      path: 'contact',
      populate: { path: 'campaign' },
    });
    if (!conversation) throw new Error('Bad request! conversation not found.');
    const response = await sendMessage(
      conversation.to,
      conversation.from,
      message,
    );
    if (!response) throw new Error("Message couldn't be sent");
    conversation.messages.push({
      message: response.body,
      sid: response.sid,
      received: false,
      read: true,
    });
    const savedConversation = await conversation.save();
    res.status(200).json(savedConversation);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.get('/conversations', async (req, res) => {
  const { page = 1 } = req.query;
  try {
    const conversations = await Conversation.find()
      .sort({ updatedAt: 'desc' })
      .skip(50 * (page - 1))
      .limit(50)
      .populate({
        path: 'contact',
        populate: { path: 'campaign' },
      });
    res.json(conversations);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.post(
  '/conversations/send/:conversationId',
  validateToken,
  async (req, res) => {
    const { conversationId } = req.params;
    try {
      const conversation = await Conversation.findById(conversationId).populate(
        {
          path: 'contact',
          populate: { path: 'campaign' },
        },
      );
      const [user, sendMessagesSchedules] = await Promise.all([
        User.findById(req.decoded.id),
        SentMessages.find({
          'message_status.to': conversation.from,
        })
          .sort({ createdAt: 'desc' })
          .populate({ path: 'schedule_id' }),
      ]);
      /**
       * 1. conatct first name
       * 2. contact last name
       * 3. address
       * 4. city
       * 5. postcode
       * 6. state
       * 7. phone number (one we receive message)
       * 8. twilio number
       * 9. conversation
       */
      const lastIndex = sendMessagesSchedules.length - 1;
      if (lastIndex === -1) throw new Error("Original message doesn't exists");
      const originalMessage = {
        message: sendMessagesSchedules[lastIndex].schedule_id.message,
        received: false,
      };
      const data = {
        thapp3_qualifier: user
          ? `${user.first_name} ${user.last_name}`.trim()
          : '',
        thapp3_first_name: conversation.contact
          ? conversation.contact.firstNameOne
          : undefined,
        thapp3_last_name: conversation.contact
          ? conversation.contact.lastNameOne
          : undefined,
        thapp3_address: `${
          conversation.contact
            ? conversation.contact.propertyAddress
            : undefined
        }, ${
          conversation.contact ? conversation.contact.propertyCity : undefined
        }, ${
          conversation.contact ? conversation.contact.propertyState : undefined
        } ${
          conversation.contact
            ? conversation.contact.propertyZipCode
            : undefined
        }, USA`,
        thapp3_phone_number: conversation.from,
        thapp3_twilio_number: conversation.to,
        thapp3_conversation: [
          { ...originalMessage },
          ...conversation.messages.map(msg => ({
            message: msg.message,
            received: msg.received,
            time: msg.createdAt,
          })),
        ],
      };
      let html = '';
      for (let i = 0; i < data.thapp3_conversation.length; i++) {
        const conv = data.thapp3_conversation[i];
        if (conv.received) {
          html += `${data.thapp3_first_name} ${data.thapp3_last_name}: ${conv.message}<br/>`;
        } else {
          html += `${data.thapp3_qualifier}: ${conv.message}<br/>`;
        }
      }
      data.thapp3_conversation = html;
      const response = await axios(
        'https://secure.globiflow.com/catch/wvsrv054i4h2vj0',
        {
          method: 'POST',
          data,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const contact = await Contact.findByIdAndUpdate(
        conversation.contact._id,
        {
          $set: { status: 'Lead' },
        },
        { new: true },
      );
      console.log('Response from custom webhook: ', response.status);
      return res.json(contact);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
);

router.get('/conversations/:conversationId', async (req, res) => {
  const { conversationId } = req.params;
  try {
    const conversation = await Conversation.findById(conversationId).populate({
      path: 'contact',
      populate: { path: 'campaign' },
    });
    res.json(conversation);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.put('/conversations/:conversationId', async (req, res) => {
  const { conversationId } = req.params;
  try {
    const conv = await Conversation.findById(conversationId).populate({
      path: 'contact',
      populate: { path: 'campaign' },
    });
    for (let i = 0; i < conv.messages.length; i++) {
      if (!conv.messages[i].read) {
        conv.messages[i].read = true;
      }
    }
    const conversation = await conv.save();
    res.json(conversation);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

module.exports = router;

async function sendMessage(from, to, body) {
  try {
    const accountSid = process.env.ACCOUNT_SID;
    const authToken = process.env.AUTH_TOKEN;
    const client = twilio(accountSid, authToken);
    const response = await client.messages.create({
      body,
      from: from.replace(/\s/g, ''),
      to: `${to}`.replace(/\s/g, ''),
    });
    return response;
  } catch (error) {
    throw error;
  }
}
