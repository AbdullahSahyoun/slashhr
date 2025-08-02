import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: true, // استخدام SSL على المنفذ 465
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export async function sendEmail(to, subject, body) {
  const mailOptions = {
    from: process.env.MAIL_FROM,
    to,
    subject,
    text: body,
    html: `<p>${body}</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.messageId);
  } catch (err) {
    console.error('❌ Failed to send email:', err.message || err);
  }
}
