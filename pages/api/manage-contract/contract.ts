import db from "@/prisma/db";


const handler = async(req:any, res:any)=> {
  if (req.method !== "POST") return res.status(405).end();
  const { 
    userId,
    freelancerId ,
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
  try {
    const Service = await db.contract.create({
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
}
export default handler;