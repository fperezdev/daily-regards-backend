import { client } from '../index';
import { messageSchema } from '../lib/schemas';
import { Message, SelectOptions } from '../lib/types';

const getMany = async (options?: SelectOptions) => {
  const query = `
    SELECT * FROM messages
    ${options?.whereClause}
    `;
  const result = await client.query(query);
  return result.rows;
};

const create = async (data: Message) => {
  const validatedMessage = messageSchema.safeParse(data);
  if (!validatedMessage.success) {
    console.log(validatedMessage.error.format());
    throw new Error('Invalid Message Input');
  }
  const { from, to, subject, date } = data;

  const query = 'INSERT INTO messages(from_name, to_email, subject, date) VALUES($1, $2, $3, $4) RETURNING *';
  const values = [from, to, subject, date];
  const result = await client.query(query, values);
  return result.rows[0];
};

export default {
  getMany,
  create,
};
