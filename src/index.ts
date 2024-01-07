import express, { json } from 'express';
import router from './api/routes/index.router';
import MessageSender from './core/message-sender';
import { PORT } from './lib/envs';

// API
const app = express();
app.use(json());
app.use(router);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

// Sender Cron Job
MessageSender.start();
