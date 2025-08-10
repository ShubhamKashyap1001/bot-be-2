import express from "express"
import authRoutes from "./routes/auth.route";
import dotenv from "dotenv"
import { testCron } from "./services/cron/cron.service";
import { redisQueueManagement } from "./services/cron/cron.service";
dotenv.configDotenv()
const app  = express()

app.use(express.json());
app.use("/auth", authRoutes);

//fetch()
app.listen(3000,()=>{
    redisQueueManagement()
    testCron()

})
