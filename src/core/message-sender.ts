import 'dotenv/config';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface IResendEmail {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = ({ from, to, subject, html }: IResendEmail) => {
  resend.emails.send({
    from: `${from} <daily-regards@resend.dev>`,
    to,
    subject,
    html,
  });
};
