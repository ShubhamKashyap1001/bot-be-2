import cron from 'node-cron'
import { addUserToRedisQueue, emailQueue } from '../Queue/user.queue'
import { worker } from '../email/email.service';
export const redisQueueManagement = async () => {
   cron.schedule('0 59 6 * * *', async () => {
    await emailQueue.drain(); 
    console.log("Queue drained before 7 AM");

    await addUserToRedisQueue(); 
    console.log("Added all users to queue before 7 AM");
  });
}

export const testCron = () => {
   cron.schedule('0 0 7 * * *', async () => {
      worker.on("completed", (job) => {
         console.log(`Job ${job.id} completed`);
      });
      worker.on("failed", (job, err) => {
         console.error(`Job ${job?.id} failed:`, err);
      });
   })
}
