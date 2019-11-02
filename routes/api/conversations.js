const router = require('express').Router();
const twilio = require('twilio');

const Contact = require('../../models/Contact');
const Conversation = require('../../models/Conversation');

router.post('/sms', async (req, res) => {
  const messageReceived = req.body;
  console.log('Received Message: ', messageReceived);
  const { From, To, MessageSid, Body } = messageReceived;
  const conversationExists = await Conversation.findOne({ from: From, to: To });
  if (conversationExists) {
    conversationExists.messages.push({
      message: Body,
      sid: MessageSid,
      received: true,
    });
    console.log(await conversationExists.save());
  } else {
    const contact = await Contact.findOne({
      $or: [
        { phoneOne: From },
        { phoneTwo: From },
        { phoneThree: From },
        { phoneFour: From },
        { phoneFive: From },
        { phoneSix: From },
        { phoneSeven: From },
        { phoneEight: From },
        { phoneNine: From },
        { phoneTen: From },
      ],
    });
    const conv = {
      from_name: 'Unknown',
      from: From,
      to: To,
      messages: [{ message: Body, sid: MessageSid, received: true }],
    };
    if (contact) {
      let name = null;
      if (contact.firstNameTwo || contact.lastNameTwo) {
        name = `${contact.firstNameTwo ? contact.firstNameTwo : ''} ${
          contact.lastNameTwo ? contact.lastNameTwo : ''
        }`;
      }
      if (contact.firstNameOne || contact.lastNameOne) {
        name = `${contact.firstNameOne ? contact.firstNameOne : ''} ${
          contact.lastNameOne ? contact.lastNameOne : ''
        }`;
      }
      if (name && name.trim().length > 0) {
        conv.from_name = name.trim();
      }
    }
    console.log(await Conversation.create(conv));
  }
  res.sendStatus(200);
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
    const conversations = await Conversation.find();
    res.json(conversations);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get('/conversations/:conversationId', async (req, res) => {
  const { conversationId } = req.params;
  try {
    const conversation = await Conversation.findById(conversationId);
    res.json(conversation);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.put('/conversations/:conversationId', async (req, res) => {
  const { conversationId } = req.params;
  try {
    await Conversation.updateMany(
      { _id: conversationId, 'messages.read': false },
      {
        $set: { 'messages.$.read': true },
      },
      { new: true, multi: true },
    );
    const conversations = await Conversation.find();
    res.json(conversations);
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
      to: to.replace(/\s/g, ''),
    });
    return response;
  } catch (error) {
    throw error;
  }
}
