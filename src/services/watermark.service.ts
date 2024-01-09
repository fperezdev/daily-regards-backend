import { client } from '../index';
import { watermarkSchema } from '../lib/schemas';
import { Watermark } from '../lib/types';

const getLast = async () => {
  const result = await client.query(
    `
    SELECT date 
    AT TIME ZONE 'UTC'
    FROM watermarks 
    ORDER BY date DESC 
    LIMIT 1
    `,
  );
  const data = result.rows[0];
  if (!data) return null;
  const date: Date = data.timezone; // Get date in UTC
  return { date }; // When there is no rows is undefined
};

const create = async (data: Watermark) => {
  const validatedWatermark = watermarkSchema.safeParse(data);
  if (!validatedWatermark.success) {
    console.log(validatedWatermark.error.format());
    throw new Error('Invalid Watermark Input');
  }
  const { date } = data;

  const query = 'INSERT INTO watermarks(date) VALUES($1) RETURNING *';
  const values = [date];
  const result = await client.query(query, values);
  return result.rows[0].date;
};

const deleteAgo = async ({ date }: { date: Date }) => {
  const result = await client.query(
    `
    DELETE FROM watermarks
    WHERE date < '${date.toISOString()}'
    `,
  );
  return result.rowCount;
};

export default {
  getLast,
  create,
  deleteAgo,
};
