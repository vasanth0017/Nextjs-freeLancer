import db from "@/prisma/db";

const handler = async (req: any, res: any) => {
  if (req.method !== "PUT") return res.status(405).end();
  const {
    contractId,
    userId,
    freelancerId,
    clientId,
    title,
    description,
    amount,
    currency,
    status,
    proposals,
    agreement,
    dueDate,
  } = req.body;
 
  if (!contractId) {
    return res.status(400).json({ error: "Service ID is required for update" });
  }
  try {
    const Service = await db.contract.update({
      where: { id: contractId },
      data: {
        userId,
        freelancerId,
        clientId,
        title,
        description,
        amount,
        currency,
        status,
        proposals,
        agreement,
        dueDate,
      },
    });
    res.status(201).json(Service);
  } catch (error) {
    res.status(500).json({ error: "Service creation failed" });
  }
};
export default handler;
