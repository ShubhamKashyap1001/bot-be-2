import { PrismaClient } from "../../../generated/prisma";
import { Queue } from "bullmq";
import { configDotenv } from "dotenv";
import Redis from "ioredis";
configDotenv()
interface User {
    email:String,
}
const prisma = new PrismaClient();
// redis conetcion
export const redisConnection = new Redis(process.env.REDIS_CONNECTION_URI || '', {
  maxRetriesPerRequest: null,
});
// bulk email queueing
export const emailQueue = new Queue("emailQueue", {
  connection: redisConnection,
});
// adding user to email queue
export const addUserToRedisQueue = async () => {
    const user:User[] = await prisma.user.findMany({})
    //console.log(user.length);
    for (const u of user){
      await emailQueue.add("email", { email: u.email })
    }
};
