import cron from 'node-cron';
import { sendEmail } from '../lib/utils/email-sender';
import { generateContent } from '../lib/utils/content-generator';
import WatermarkService from '../services/watermark.service';
import MessageService from '../services/message.service';

let watermark: Date;

const start = async () => {
  watermark = await getWatermark();

  // Send messages to queue every min
  cron.schedule('0 * * * * *', sendMessagesToQueue);
};

// Get
const sendMessagesToQueue = async () => {
  const start = watermark;
  const end = new Date();
  end.setSeconds(0);
  end.setMilliseconds(0);
  if (end === start) end.setMinutes(end.getMinutes() + 1); // in case it truncates to previuous minute
  watermark = end; // set new watermark, so it does not send the same messages if the previous call is not done.

  const messagesToSend = await getMessagesToSend(start, end);

  for (let i = 0; i < messagesToSend.length; i++) {
    const message = messagesToSend[i];
    console.log(message);
    const content = await generateContent(message.subject);
    sendEmail({
      from: message.from_name,
      to: message.to_email,
      subject: message.subject,
      html: `<p>${content}</p>`,
    });
  }

  await saveWatermark(end);
  await deleteOldWatermarks(end);
};

// Get last watermark from db, if does not exists create new one
const getWatermark = async () => {
  const data = await WatermarkService.getLast();
  if (data == null) {
    const newWatermark = new Date();
    newWatermark.setSeconds(0);
    newWatermark.setMilliseconds(0);
    return newWatermark;
  }
  return data.date;
};

const getMessagesToSend = async (start: Date, end: Date) => {
  return await MessageService.getMany({
    whereClause: `WHERE date > timestamp '${start.toISOString()}' AND date <= timestamp '${end.toISOString()}'`,
  });
};

// Set new watermark, save it in db
const saveWatermark = async (newWatermark: Date) => {
  await WatermarkService.create({ date: newWatermark });
};

// Delete watermarks older than 1 hour
const deleteOldWatermarks = async (newWatermark: Date) => {
  const deleteDate = new Date(newWatermark);
  deleteDate.setHours(deleteDate.getHours() - 1);
  WatermarkService.deleteAgo({ date: deleteDate });
};

export default { start };
