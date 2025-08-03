import { CODEFORCES_API_ENDPOINTS } from "../../endpoints/codeforces";
import axios from "axios";
import { sendEmail } from "../email/email.service";

const fetch = async () => {
   const res = await axios.get(CODEFORCES_API_ENDPOINTS.PROBLEMSET);
   const problems = res.data.result.problems;
   console.log(problems); 
   return res.data.result.problems;
};

export const testCron = () => {
   setInterval(async () => {
      try {
         //await fetch();
         await sendEmail()
      } catch (err) {
         console.error("Failed to fetch Codeforces problemset:", err);
      }
   }, 5000);
};
