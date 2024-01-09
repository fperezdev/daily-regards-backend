import { Client } from 'pg';
import express, { json } from 'express';
import router from './api/routes/index.router';
import MessageSender from './core/message-sender';
import { DATABASE_URL, PORT } from './lib/envs';

// Set server timezone to UTC
process.env.TZ = 'UTC';

// DB
export const client = new Client(DATABASE_URL);
client.connect();

// API
const app = express();
app.set('trust proxy', Number(process.env.PROXY_NUMBER)); // For Railway proxy
app.use(json());
app.use(router);
app.listen(PORT, () => {
  console.log(`Server is running ${process.env.NODE_ENV === 'development' ? `at http://localhost:${PORT}` : ''}`);
});

// Sender Cron Job
MessageSender.start();
