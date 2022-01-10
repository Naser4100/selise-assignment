import nodemailer, { SendMailOptions } from 'nodemailer';
import config from 'config';

const smtp = config.get<{
  user: string;
  pass: string;
  host: string;
  port: number;
  secure: boolean;
}>('smtp');

const transporter = nodemailer.createTransport({
  service: smtp.host,
  auth: { user: smtp.user, pass: smtp.pass },
});

async function sendEmail(payload: SendMailOptions) {
  transporter.sendMail(payload, (err, info) => {
    if (err) {
      console.error(err, 'Error sending email');
      return;
    }

    console.info(`Email sent to ${payload.to}`);
  });
}

export default sendEmail;
