import nodemailer, { createTransport } from "nodemailer"
import dotenv from "dotenv";
import { generateMessageHTML } from "../link/codeforces/link.codeforces";
dotenv.config();
const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
})



export const sendEmail = async () => {
  const message = await generateMessageHTML();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "shubh9142996613@gmail.com",
    subject: "Your Daily Codeforces Problems",
    html: message,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

