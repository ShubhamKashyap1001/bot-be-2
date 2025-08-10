import nodemailer, { createTransport } from "nodemailer"
import dotenv from "dotenv";
import { generateMessageHTML } from "../link/codeforces/link.codeforces";
import { Worker } from "bullmq";
import { redisConnection } from "../Queue/user.queue";
dotenv.config();
const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
})
export const worker = new Worker(
  "emailQueue",
  async (job) => {
    const { email } = job.data
    console.log("Sending email to:", email);
    if (!email) {
      throw new Error("No recipient email provided in job data");
    }
    const message = await generateMessageHTML()
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Daily Codeforces Problems",
      html: message,
    };
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  }, {
  connection: redisConnection,
  concurrency: 5,
}
)
