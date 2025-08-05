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


export const generateMessageHTML = async () => {
  const problemLinks = await generateProblemLinks();

  const problemsHTML = problemLinks
    .map(
      (link, index) => `
        <p style="margin: 10px 0;">
          <a href="${link}" style="color: #FFA500; text-decoration: none;">Problem ${index + 1}</a>: 
          <span style="color: #ffffff;">${link}</span>
        </p>
      `
    )
    .join("");

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Bot - Codeforces</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #000000; color: #ffffff; font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 30px auto; padding: 20px; background-color: #1a1a1a; border: 2px solid #FFA500; border-radius: 8px;">
          <h2 style="color: #FFA500; text-align: center;">Bot - Codeforces</h2>
          <p style="font-size: 16px;">Here are your random Codeforces problems:</p>
          ${problemsHTML}
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #FFA500;" />
          <div style="text-align: center;">
            <a href="" style="color: #FFA500; margin-right: 20px;">Subscribe</a>
            |
            <a href="" style="color: #FFA500; margin-left: 20px;">Unsubscribe</a>
          </div>
        </div>
      </body>
    </html>
  `;

  return html;
};
