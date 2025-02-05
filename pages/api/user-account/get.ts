import db from "@/prisma/db";

const handler = async (req: any, res: any) => {
  if (req.method !== "GET") return res.status(405).end();
  const email = req.query.email as string;

  try {
    const user = await db.user.findMany({
      where: {email:email},
    });
    res.status(201).json(user);

  } catch (error) {
    res.status(500).json({ error: "accont details fetch failed" });
  }
};
export default handler;
