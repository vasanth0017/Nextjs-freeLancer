import db from "@/prisma/db";
const handler = async (req: any, res: any) => {
  if (req.method === "POST") {
    const { contractId, senderId, receiverId, content, freelancerId } =
      req.body;

    if (!contractId || !senderId || !receiverId || !content || !freelancerId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const message = await db.message.create({
        data: { contractId, senderId, receiverId, content, freelancerId },
      });

      return res.status(201).json(message);
    } catch (error) {
      return res.status(500).json({ error: "Error sending message" });
    }
  }

  return res.status(405).end();
};
export default handler;
