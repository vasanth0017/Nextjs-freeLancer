import db from "@/prisma/db";

const handler = async (req: any, res: any) => {
  if (req.method !== "GET") return res.status(405).end();
  const serviceId = req.query.userId as string;
  try {
    const user = await db.freelancerService.findMany({
      where: { id: serviceId },
      include: { contracts: true },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Service details fetch failed" });
  }
};
export default handler;
