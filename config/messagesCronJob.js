const moment = require('moment-timezone');
// Twilio
const twilio = require('twilio');
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const { AREA_CODE } = require('../config/keys');

// Models
const Contact = require('../models/Contact');
const Schedule = require('../models/Schedule');
const SentMessages = require('../models/SentMessages');
const PhoneNumber = require('../models/PhoneNumber');

module.exports = async () => {
  console.log('Cron job running...');
  const toDate = moment().format('YYYY-MM-DD');
  try {
    const schedules = await getSchedulesByDate(toDate);
    if (schedules.length <= 0) {
      console.log('0 schedules today!');
      return;
    }
    const activeSchedules = filterActiveSchedules(schedules);
    if (activeSchedules.length <= 0) {
      console.log('no active schedule right now');
      return;
    }
    const schedulesStatus = await getSentMessagesStatus(
      activeSchedules.map(schedule => schedule._id),
    );
    const msgPromises = [];
    for (let i = 0; i < activeSchedules.length; i++) {
      const status = schedulesStatus.find(
        x => x.schedule_id.toString() === activeSchedules[i]._id.toString(),
      );
      const msg = {
        schedule_id: activeSchedules[i]._id,
        message: activeSchedules[i].message,
        phone_number_id: activeSchedules[i].phone_number,
        campaign_id: activeSchedules[i].campaign,
        page: 0,
        offset: 0,
        limit: 10,
        date: toDate,
        isFromMultiple: activeSchedules[i].isFromMultiple,
      };
      if (status) {
        msg.page = status.pages;
        msg.offset = status.pages * msg.limit;
        const sentToday = status.sent_messages.find(
          x =>
            new Date(x.date).toISOString() === new Date(toDate).toISOString(),
        );
        if (sentToday) {
          console.log(
            parseInt(sentToday.sent),
            parseInt(activeSchedules[i].day_limit),
          );
          const diff =
            parseInt(activeSchedules[i].day_limit) - parseInt(sentToday.sent);
          if (diff <= 0) {
            console.log('Limit reached...');
            continue;
          }
          if (diff < msg.limit) {
            msg.limit = diff;
          }
          msg.sent = sentToday.sent;
        }
      }
      msgPromises.push(getContactsAndSendMessages(msg));
    }
    if (msgPromises <= 0) {
      console.log('There are no messages to send...');
      return;
    }
    console.log(JSON.stringify(await Promise.all(msgPromises), undefined, 2));
  } catch (error) {
    throw error;
  }
};

async function getSchedulesByDate(toDate) {
  try {
    return await Schedule.find({
      start_date: { $lte: toDate },
      end_date: { $gte: toDate },
    });
  } catch (error) {
    throw error;
  }
}

function filterActiveSchedules(schedules) {
  const activeSchedules = [];
  for (let i = 0; i < schedules.length; i++) {
    const now = moment.tz(schedules[i].time_zone).format('HH:mm:ss');
    if (schedules[i].start_time < now && schedules[i].end_time > now) {
      activeSchedules.push(schedules[i]);
    }
  }
  return activeSchedules;
}

async function getContacts(campaign_id, page = 0, offset, limit = 5) {
  try {
    const contacts = await Contact.find({ campaign: campaign_id })
      .skip(offset)
      .limit(limit);
    return contacts;
  } catch (error) {
    throw error;
  }
}

async function getSentMessagesStatus(schudulesIds) {
  try {
    return await SentMessages.find({ schedule_id: { $in: schudulesIds } });
  } catch (error) {
    throw error;
  }
}

async function getContactsAndSendMessages({
  schedule_id,
  message,
  phone_number_id,
  campaign_id,
  page,
  offset,
  limit,
  date,
  isFromMultiple,
}) {
  try {
    const contacts = await getContacts(campaign_id, page, offset, limit);
    if (contacts.length <= 0) {
      console.log('Message sent to all contacts.');
      return;
    }

    let from = null;
    let messagingServiceSid = null;
    if (!isFromMultiple) {
      const phoneNumber = await PhoneNumber.findById(phone_number_id);
      from = phoneNumber.phone_number;
    } else {
      messagingServiceSid = process.env.MESSAGING_SERVICE_ID;
    }

    const to = [];
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].status === 'DO NOT CALL') {
        continue;
      }
      if (contacts[i].phoneOne) {
        to.push(contacts[i].phoneOne);
      }
      if (contacts[i].phoneTwo) {
        to.push(contacts[i].phoneTwo);
      }
      if (contacts[i].phoneThree) {
        to.push(contacts[i].phoneThree);
      }
      if (contacts[i].phoneFour) {
        to.push(contacts[i].phoneFour);
      }
      if (contacts[i].phoneFive) {
        to.push(contacts[i].phoneFive);
      }
      if (contacts[i].phoneSix) {
        to.push(contacts[i].phoneSix);
      }
      if (contacts[i].phoneSeven) {
        to.push(contacts[i].phoneSeven);
      }
      if (contacts[i].phoneEight) {
        to.push(contacts[i].phoneEight);
      }
      if (contacts[i].phoneNine) {
        to.push(contacts[i].phoneNine);
      }
      if (contacts[i].phoneTen) {
        to.push(contacts[i].phoneTen);
      }
    }
    const uniqueTo = Array.from(new Set(to));
    const msgPrimises = [];
    if (uniqueTo.length <= 0) {
      console.log('No Valid number found...');
      return;
    }
    for (let i = 0; i < uniqueTo.length; i++) {
      msgPrimises.push(
        sendMessage({
          from,
          messagingServiceSid,
          to: uniqueTo[i],
          body: message,
        }),
      );
    }
    if (msgPrimises.length <= 0) {
      console.log('Error Sending messages...');
      return;
    }
    const responses = await Promise.all(msgPrimises);
    const message_status = [];
    let sent = 0;
    for (let i = 0; i < responses.length; i++) {
      if (responses[i]) {
        message_status.push({
          to: responses[i].to,
          status: responses[i].status,
          sid: responses[i].sid,
        });
        sent += 1;
      }
    }
    const sentMessagesStatus = {
      schedule_id,
      pages: page + 1,
      sent_messages: {
        date,
        sent,
      },
      message_status,
    };
    return await addMessageStatus(sentMessagesStatus);
  } catch (error) {
    throw error;
  }
}

async function addMessageStatus({
  schedule_id,
  pages,
  message_status,
  sent_messages,
}) {
  try {
    const sentMessagesStatus = await SentMessages.findOne({ schedule_id });
    if (sentMessagesStatus) {
      sentMessagesStatus.pages = pages;
      sentMessagesStatus.message_status = [
        ...sentMessagesStatus.message_status,
        ...message_status,
      ];
      const index = sentMessagesStatus.sent_messages.findIndex(x => {
        console.log(
          new Date(x.date).toISOString(),
          new Date(sent_messages.date).toISOString(),
        );
        return (
          new Date(x.date).toISOString() ===
          new Date(sent_messages.date).toISOString()
        );
      });
      console.log('INDEX: ', index);
      if (index >= 0) {
        sentMessagesStatus.sent_messages[index].sent =
          sentMessagesStatus.sent_messages[index].sent + sent_messages.sent;
      } else {
        sentMessagesStatus.sent_messages = [sent_messages];
      }
      return await sentMessagesStatus.save();
    } else {
      const newSentMessage = new SentMessages({
        schedule_id,
        pages,
        message_status,
        sent_messages: [sent_messages],
      });
      return await newSentMessage.save();
    }
  } catch (error) {
    throw error;
  }
}

async function sendMessage({ from, to, body, messagingServiceSid }) {
  try {
    const response = await client.messages.create({
      body,
      from: from ? from.replace(/\s/g, '') : undefined,
      messagingServiceSid: messagingServiceSid || undefined,
      statusCallback: process.env.SMS_STATUS_CALLBACK,
      to: `+${AREA_CODE}${to}`.replace(/\s/g, ''),
    });
    return response;
  } catch (error) {
    throw error;
  }
}
