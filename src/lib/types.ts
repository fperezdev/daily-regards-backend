import { z } from 'zod';
import { messageSchema, watermarkSchema } from './schemas';

export type Message = z.infer<typeof messageSchema>;

export type Watermark = z.infer<typeof watermarkSchema>;
