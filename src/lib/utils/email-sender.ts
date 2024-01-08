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
export const sendEmail = async ({ from, to, subject, html }: IResendEmail) => {
  console.log('sending email');
  const result = await resend.emails.send({
    from: `${from} <daily-regards@resend.dev>`,
    to,
    subject,
    html,
  });
  console.log(result);
};
