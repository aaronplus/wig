const router = require('express').Router();
const twilio = require('twilio');

const { AREA_CODE } = require('../../config/keys');

const Contact = require('../../models/Contact');
const Conversation = require('../../models/Conversation');
const SentMessages = require('../../models/SentMessages');
const Keyword = require('../../models/Keyword');

router.post('/sms', async (req, res) => {
  const messageReceived = req.body;
  console.log('Received Message: ', messageReceived);
  const { From, To, MessageSid, Body } = messageReceived;
  const conversationExists = await Conversation.findOne({
    from: From,
    to: To,
  }).populate({
    path: 'contact',
    populate: { path: 'campaign' },
  });
  const keywords = await Keyword.find({ type: false });
  let Pass = true;
  for (let i = 0; i < keywords.length; i++) {
    console.log('Keywords', keywords[i].keyword);
    if (Body.toLowerCase().includes(keywords[i]._doc.keyword.toLowerCase())) {
      Pass = false;
      break;
    }
  }
  const newMessage = {
    message: Body,
    sid: MessageSid,
    received: true,
    status: Pass ? 'PASS' : 'FAIL',
  };
  if (conversationExists) {
    conversationExists.messages.push(newMessage);
    if (!Pass) {
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

router.post('/reply/:conversationId', async (req, res) => {
  const { conversationId } = req.params;
  const { message } = req.body;
  try {
    const conversation = await Conversation.findById(conversationId);
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
    });
    const savedConversation = await conversation.save();
    res.status(200).json(savedConversation);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.get('/conversations', async (req, res) => {
  try {
    const conversations = await Conversation.find().populate({
      path: 'contact',
      populate: { path: 'campaign' },
    });
    res.json(conversations);
  } catch (error) {
    res.status(400).json(error);
  }
});

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
