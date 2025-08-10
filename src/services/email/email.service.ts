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
    console.log("Worker started");

    console.log("Job data:", job.data);
    const { email } = job.data;

    if (!email) {
      throw new Error("No recipient email provided in job data");
    }

    try {
      const message = await generateMessageHTML();
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your Daily Codeforces Problems",
        html: message,
      };
      await transporter.sendMail(mailOptions);
      //console.log(`Email sent to ${email}`);
    } catch (error) {
      console.error(`Failed to send email to ${email}:`, error);
      throw error; 
    }
  },
  {
    connection: redisConnection,
    concurrency: 5,
  }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});
worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed:`, err);
});
worker.on('error', err => {
  console.error('Worker error:', err);
});
