import { Resend } from 'resend';
import { RESEND_API_KEY } from '../envs';

const resend = new Resend(RESEND_API_KEY);

interface IResendEmail {
  from: string;
  to: string;
  subject: string;
  html: string;
}

// Function to send email with the message requested.
export const sendEmail = async ({ from, to, subject, html }: IResendEmail) => {
  const result = await resend.emails.send({
    from: `${from} <daily-regards@resend.dev>`,
    to,
    subject,
    html,
  });
  if (result.error) console.log('Error sending email with RESEND', result.error);
};
