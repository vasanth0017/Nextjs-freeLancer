import db from "@/prisma/db";

const handler = async (req: any, res: any) => {
  console.log("request",req)
  if (req.method !== "GET") return res.status(405).end();
  const  userId  = req.query.userId as string;
    console.log(userId)
  try {
    const user = await db.freelancerService.findMany({
      where: {id:userId},
    });
    res.status(201).json(user);

  } catch (error) {
    res.status(500).json({ error: "Service details fetch failed" });
  }
};
export default handler;
