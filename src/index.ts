import 'dotenv/config';
import express, { json } from 'express';
import router from './api/routes/index.router';
import MessageQueueSender from './core/message-queue-sender';

// API
const port = process.env.PORT ?? 3001;
const app = express();
app.use(json());
app.use(router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

// Sender Cron Job
MessageQueueSender.start();
