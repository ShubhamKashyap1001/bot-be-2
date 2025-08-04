import express from "express"
import { testCron } from "./services/cron/cron.service"
import dotenv from "dotenv"
import { fetch } from "./services/problems/codeforces.service"
dotenv.configDotenv()
const app  = express()
//fetch()
app.get('/',(req,res)=>{
    res.send("Upp ")

})
app.listen(3000,()=>{
    // here i am calling my cron
    testCron()
    console.log("Server is runnig");
    
})