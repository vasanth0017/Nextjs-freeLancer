import db from "@/prisma/db";
const handler = async (req: any, res: any) => {
  if (req.method === "DELETE") {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const message = await db.message.deleteMany({
       where: {id:id}
      });
      if (message.count === 0) {
        return res.status(404).json({ message: 'msg not found' });
      }
      return res.status(201).json(message);
    } catch (error) {
      return res.status(500).json({ error: "Error sending message" });
    }
    finally {
        await db.$disconnect();
      }
  }

  return res.status(405).end();
};
export default handler;
