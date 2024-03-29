import 'dotenv/config';

export const DATABASE_URL = process.env.DATABASE_URL;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const PORT = process.env.PORT ?? 3001;
export const RESEND_API_KEY = process.env.RESEND_API_KEY;
