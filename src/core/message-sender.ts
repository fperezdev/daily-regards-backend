import { PrismaClient } from '@prisma/client';
import cron from 'node-cron';
import { sendEmail } from '../lib/utils/email-sender';
import { generateContent } from '../lib/utils/content-generator';

const messageModel = new PrismaClient().message;
const watermarkModel = new PrismaClient().messageWatermark;

export default class MessageSender {
  static watermark: Date;

  static async start() {
    MessageSender.watermark = await getWatermark();

    // Send messages to queue every min
    cron.schedule('0 * * * * *', sendMessagesToQueue);
  }
}

// Get
const sendMessagesToQueue = async () => {
  const start = MessageSender.watermark;
  const end = new Date();
  end.setSeconds(0);
  end.setMilliseconds(0);
  if (end === start) end.setMinutes(end.getMinutes() + 1); // in case it truncates to previuous minute
  MessageSender.watermark = end;

  const messagesToSend = await messageModel.findMany({
    where: {
      date: {
        gt: start,
        lte: end,
      },
    },
  });

  for (let i = 0; i < messagesToSend.length; i++) {
    const message = messagesToSend[i];
    console.log(message);
    const content = await generateContent();
    console.log(`sending new messaga with content: "${content}"`);
    sendEmail({
      from: message.from,
      to: message.to,
      subject: message.subject,
      html: `<p>${content}</p>`,
    });
  }

  await saveWatermark(end);
};

// Get last watermark from db, if not exists create new one
const getWatermark = async () => {
  const data = await watermarkModel.findFirst({
    select: {
      date: true,
    },
    orderBy: {
      date: 'desc',
    },
  });
  if (data == null) {
    const newWatermark = new Date();
    newWatermark.setSeconds(0);
    newWatermark.setMilliseconds(0);
    return newWatermark;
  }
  return data.date;
};

// Set new watermark, save it in db and delete older than 1 hour
const saveWatermark = async (watermark: Date) => {
  await watermarkModel.create({ data: { date: watermark } });
  // delete
  const deleteDate = new Date(watermark);
  deleteDate.setHours(deleteDate.getHours() - 1);
  await watermarkModel.deleteMany({
    where: {
      date: {
        lt: deleteDate,
      },
    },
  });
};
