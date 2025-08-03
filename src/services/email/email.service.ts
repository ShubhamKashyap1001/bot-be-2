import nodemailer, { createTransport } from "nodemailer"
import dotenv from "dotenv";
dotenv.config();
const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
})

export const sendEmail = async () => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "shubh9142996613@gmail.com", 
    subject: "Automated Email",
    text: "This is an automated email sent every 5 seconds using Nodemailer.",
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
