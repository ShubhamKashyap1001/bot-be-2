import cron from 'node-cron'
import { addUserToRedisQueue, emailQueue } from '../Queue/user.queue'
// clear the queue
export const queueClear = async () => {
   cron.schedule('* * * * * *', async () => {
      await emailQueue.clean(0, 1000, 'completed');
      await emailQueue.clean(0, 1000, 'failed');
      await emailQueue.clean(0, 1000, 'delayed');
      await emailQueue.drain();
      await emailQueue.obliterate({ force: true });
      console.log("Queue drained before 7 AM");
   });
}
// add user to queue
export const testCron = () => {
   cron.schedule('* * * * * *', async () => {
      await addUserToRedisQueue()
   })
}
