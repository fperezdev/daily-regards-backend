import OpenAI from 'openai';
import { OPENAI_API_KEY } from '../envs';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export async function generateContent() {
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-0301',
    messages: [
      {
        role: 'user',
        content: 'hola, cómo estás?',
      },
    ],
    temperature: 0.8,
    max_tokens: 20,
  });
  console.log(completion.choices[0]);
  return completion.choices[0];
}
