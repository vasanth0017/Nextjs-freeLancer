import db from "@/prisma/db";

const handler = async (req: any, res: any) => {
  if (req.method !== "GET") return res.status(405).end();
  const email = req.query.email as string;
  console.log(email)
  try {
    const user = await db.user.findMany({
      where: {email:email},
      include:{
        services : true
      }
    });
    res.status(201).json(user);

  } catch (error) {
    res.status(500).json({ error: "accont details fetch failed" });
  }
};
export default handler;
