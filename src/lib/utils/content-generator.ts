import OpenAI from 'openai';
import { OPENAI_API_KEY } from '../envs';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export async function generateContent(subject: string) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-0301',
    messages: [
      {
        role: 'user',
        content: `Necesito un mensaje para enviar a una persona con la temática '${subject}'. Es de suma importancia que el mensaje tenga más de 40 caracteres, pero menos de 50.`,
      },
    ],
    temperature: 0.8,
    max_tokens: 50,
  });
  const content = completion.choices[0]?.message.content;
  return content?.replace(/^"(.*)"$/, '$1'); // Remove outer quotes
}
