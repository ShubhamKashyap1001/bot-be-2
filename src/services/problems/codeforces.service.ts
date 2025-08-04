import { PrismaClient } from "../../../generated/prisma";
import { CODEFORCES_API_ENDPOINTS } from "../../endpoints/codeforces";
import axios from "axios";
const prisma = new PrismaClient()
export const fetch = async () => {
   try {
    const res = await axios.get(CODEFORCES_API_ENDPOINTS.PROBLEMSET);
    const problems = res.data.result.problems.slice(0,200);
    const formatted = problems.map((p: any) => ({
       contestId: p.contestId,
       index: (p.index),
       name: p.name,
       type: p.type,
       points: p.points ?? null,
       rating: p.rating ?? null,
       tags: p.tags,
     }));
     await prisma.codeforcesProblem.createMany({
         data:formatted,
         skipDuplicates:true
     })
     console.log(problems);
     
   } catch (error) {
    console.log(error);
    
   }
   
};
