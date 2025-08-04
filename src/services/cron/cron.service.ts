
import { sendEmail } from "../email/email.service";


export const testCron = () => {
   setInterval(async () => {
      try {
         await sendEmail()
         
      } catch (err) {
         console.error("Failed to fetch Codeforces problemset:", err);
      }
   }, 5000);
};
