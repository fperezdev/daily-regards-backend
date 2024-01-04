import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { z } from 'zod';

const messageModel = new PrismaClient().message;

const messageSchema = z.object({
  from: z.string({ required_error: 'Debes ingresar un correo remitente' }).email({
    message: 'Debes ingresar un email válido',
  }),
  to: z.string({ required_error: 'Debes ingresar un correo receptor' }).email({
    message: 'Debes ingresar un email válido',
  }),
  subject: z
    .string({
      required_error: 'Debes ingresar un correo receptor',
    })
    .min(3, { message: 'El asunto debe contener al menos 3 letras' }),
  date: z
    .date({
      required_error: 'Debes ingresar una fecha.',
    })
    .min(new Date(), { message: 'La fecha debe ser futura.' }),
});

export default class MessageController {
  static getAllMessages = async (_req: Request, res: Response) => {
    const messages = await messageModel.findMany();
    return res.status(200).json(messages);
  };

  static createMessage = async (req: Request, res: Response) => {
    const body = { ...req.body, date: new Date(req.body.date) };
    const validatedMessage = messageSchema.safeParse(body);
    if (!validatedMessage.success) return res.status(400).json({ error: JSON.parse(validatedMessage.error.message) });
    const createdMessage = await messageModel.create({ data: validatedMessage.data });
    return res.status(200).json(createdMessage);
  };
}
