import db from "@/prisma/db";

const handler = async (req: any, res: any) => {
  const  {serviceId}  = req.body;
  try {
    const user = await db.freelancerService.deleteMany({
      where: {id:serviceId},
    });
    res.status(201).json(user);

  } catch (error) {
    res.status(500).json({ error: "Service details fetch failed" });
  }
  finally {
    await db.$disconnect();
  }
};
export default handler;
