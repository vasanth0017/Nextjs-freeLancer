import db from "@/prisma/db";

const handler = async (req: any, res: any) => {

  if (req.method !== "PUT") return res.status(405).end();
  const {id, email, name, phoneNumber, address, company} = req.body

  try {
    const existingEntry = await db.user.findFirst({
        where: { id: id },
      })
  
      if (!existingEntry) {
        return res.status(404).json({ message: 'user not found' })
      }
     // Update only the matched webhook entry
     const updatedEntry = await db.user.update({
        where: { id: existingEntry.id },
        data: {
            name:name, 
            email:email,
            phoneNumber:phoneNumber,
            address:address,
            company:company

        },
      })
    res.status(201).json(updatedEntry);
  } catch (error) {
    res.status(500).json({ error: "accont details fetch failed" });
  }
};
export default handler;
