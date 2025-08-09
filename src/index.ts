import express from "express"
import { PrismaClient } from "../generated/prisma";
import { testCron } from "./services/cron/cron.service"
import authRoutes from "./routes/auth.route";
import dotenv from "dotenv"

const prisma = new PrismaClient();

dotenv.configDotenv()
const app  = express()

app.use(express.json());
app.use("/auth", authRoutes);

//fetch()
app.get('/',(req,res)=>{
    
    res.send("Upp ")

})


app.listen(3000,()=>{
    // here i am calling my cron
    testCron()
    console.log("Server is up");
    
})
