import { Request, Response } from 'express';
import { messageSchema } from '../../lib/schemas';
import MessageService from '../../services/message.service';

const getAll = async (_req: Request, res: Response) => {
  const messages = await MessageService.getMany();
  return res.status(200).json(messages);
};

const create = async (req: Request, res: Response) => {
  const body = { ...req.body, date: new Date(req.body.date) };
  const validatedMessage = messageSchema.safeParse(body);
  if (!validatedMessage.success) {
    console.log(validatedMessage.error.format());
    return res.status(400).json({ error: 'Error en input' });
  }
  const createdMessage = await MessageService.create(validatedMessage.data);
  return res.status(200).json(createdMessage);
};

export default {
  getAll,
  create,
};
