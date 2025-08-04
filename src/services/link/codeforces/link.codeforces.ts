import { PrismaClient } from "../../../../generated/prisma";
import { CODEFORCES_API_ENDPOINTS } from "../../../endpoints/codeforces";
const prisma = new PrismaClient()

export const selectTwoRandomProblem = async () =>{
   const problems = await prisma.$queryRaw<
    any[]
   >`SELECT * FROM "codeforcesProblem" ORDER BY RANDOM() LIMIT 2`
   return problems
   
}

export const generateProblemLinks = async () => {
  const problemArray = await selectTwoRandomProblem();
  const res: string[] = [];
  problemArray.forEach((problem) => {
    const url = `${CODEFORCES_API_ENDPOINTS.PROBLEMLINK}/${problem.contestId}/${problem.index}`;
    res.push(url); 
  });

  return res;
};


export const generateMessageText = async () => {
  const problemLinks = await generateProblemLinks();
  const text = `Here are your random Codeforces problems:\n\n${problemLinks
    .map((link, index) => `Problem ${index + 1}: ${link}`)
    .join("\n")}`;

  return text;
};
