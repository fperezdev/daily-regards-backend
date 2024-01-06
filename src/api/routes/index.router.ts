import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import messageRouter from './message.router';

const router = Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 30 minutes
  limit: 10, // Limit each IP to 10 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Use an external store for consistency across multiple server instances.
});

router.use(limiter);

router.get('/', (_req, res) => {
  res.send('Daily Regards Server');
});

router.use('/messages', messageRouter);

export default router;
