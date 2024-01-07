import { Resend } from 'resend';
import { RESEND_API_KEY } from '../envs';

const resend = new Resend(RESEND_API_KEY);

interface IResendEmail {
  from: string;
  to: string;
  subject: string;
  html: string;
}

// Función para enviar email con resend
export const sendEmail = ({ from, to, subject, html }: IResendEmail) => {
  resend.emails.send({
    from: `${from} <daily-regards@resend.dev>`,
    to,
    subject,
    html,
  });
};
