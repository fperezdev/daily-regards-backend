import express, { json } from 'express';
import 'dotenv/config';
import messageRouter from './routes/message.router';

const app = express();
app.use(json());
const port = process.env.PORT ?? 3001;

app.get('/', (_req, res) => {
  res.send('Express + TypeScript Server');
});

app.use('/messages', messageRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
