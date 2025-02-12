import db from "@/prisma/db"; 

export default async function handler(req: any, res: any) {
  if (req.method === "GET") {
    const { contractId } = req.query;

    if (!contractId) {
      return res.status(400).json({ error: "Contract ID is required" });
    }

    try {
      const messages = await db.message.findMany({
        where: { contractId: String(contractId) },
        orderBy: { createdAt: "asc" },
      });
 
      return res.status(200).json(messages);
    } catch (error) {
      return res.status(500).json({ error: "Error fetching messages" });
    }
  }
}
