import nodemailer from "nodemailer";
import { env } from "../config/environments";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: false,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

export const sendEmail = async (to, subject, code) => {
  try {
    const mailOptions = {
      from: '"Chat App Service" <no-reply@chatapp.com>',
      to,
      subject,
      html: `
                <h3>Xin chào,</h3>
                <p>Mã xác thực của bạn là:</p>
                <h2 style="color: #ff5733;">${code}</h2>
                <p>Mã có hiệu lực trong 5 phút.</p>
            `,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
