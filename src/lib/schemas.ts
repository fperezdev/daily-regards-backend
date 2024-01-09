import { z } from 'zod';

export const messageSchema = z.object({
  from: z.string({ required_error: 'Debes ingresar un nombre para el remitente' }),
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

export const watermarkSchema = z.object({
  date: z.date({
    required_error: 'Debes ingresar una fecha.',
  }),
});
