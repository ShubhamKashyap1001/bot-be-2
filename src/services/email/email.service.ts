import nodemailer, { createTransport } from "nodemailer"
import dotenv from "dotenv";
import { generateMessageHTML } from "../link/codeforces/link.codeforces";
import { PrismaClient } from "../../../generated/prisma";
const prisma = new PrismaClient()
dotenv.config();
const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
})
export const sendEmail = async () => {
  const user = await prisma.user.findMany({})
  for (const u of user) {
    const message = await generateMessageHTML();
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: u.email,
      subject: "Your Daily Codeforces Problems",
      html: message,
    };
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", u.email);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
};

// like send the mail one by one 