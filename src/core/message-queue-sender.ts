import { PrismaClient } from '@prisma/client';
import cron from 'node-cron';
import { sendEmail } from './message-sender';

const messageModel = new PrismaClient().message;

export default class MessageQueueSender {
  static watermark: Date;

  static start() {
    const newWatermark = new Date();
    newWatermark.setSeconds(0);
    newWatermark.setMilliseconds(0);
    MessageQueueSender.watermark = newWatermark;

    // Send messages to queue every min
    cron.schedule('0 * * * * *', MessageQueueSender.#sendMessagesToQueue);
  }

  static async #sendMessagesToQueue() {
    const start = MessageQueueSender.watermark;
    const end = new Date(start);
    end.setMinutes(end.getMinutes() + 1);

    const messagesToSend = await messageModel.findMany({
      where: {
        date: {
          gt: start,
          lte: end,
        },
      },
    });

    console.log(messagesToSend);

    messagesToSend.forEach((message) =>
      sendEmail({
        from: message.from,
        to: message.to,
        subject: message.subject,
        html: `<p>${message.subject}</p>`,
      }),
    );

    MessageQueueSender.watermark = end;
  }
}
