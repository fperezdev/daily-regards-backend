import { Client } from 'pg';
import express, { json } from 'express';
import router from './api/routes/index.router';
import MessageSender from './core/message-sender';
import { DATABASE_URL, PORT } from './lib/envs';
// import WatermarkService from './services/watermark.service';
// import MessageService from './services/message.service';

process.env.TZ = 'UTC';

// DB
export const client = new Client(DATABASE_URL);
client.connect();

// API
const app = express();
app.use(json());
app.use(router);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

// Sender Cron Job
MessageSender.start();

// (async () => {
// await MessageService.create({
//   from: 'perezlefiman2@gmail.com',
//   to: 'fperez.sdev@gmail.com',
//   subject: 'Motivación para hacer ejercicio',
//   date: new Date('2024-01-08T00:47:00.000Z'),
// });
// await WatermarkService.create({ date: new Date('2024-01-07T23:47:00.000Z') });
// await MessageService.getMany({ whereClause: "WHERE date > timestamp '2024-01-07T21:17:00.000Z'" });
// WatermarkService.deleteAgo({ date: new Date('2024-01-08T00:00:00.000Z') });
// })();
