import { Router } from 'express';
import messageRouter from './message.router';

const router = Router();

router.get('/', (_req, res) => {
  res.send('Daily Regards Server');
});

router.use('/messages', messageRouter);

export default router;
