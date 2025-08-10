import express from "express"
import authRoutes from "./routes/auth.route";
import dotenv from "dotenv"
import { testCron } from "./services/cron/cron.service";
dotenv.config()
const app  = express()

app.use(express.json());
app.use("/auth", authRoutes);

app.listen(3000,()=>{
    testCron()
})
