import db from "@/prisma/db";


const handler = async(req:any, res:any)=> {
  if (req.method !== "POST") return res.status(405).end();
  const { 
    name,
    email,
    address,
    state,
    country,
    linkedin,
    phoneNumber,
    age,
    categories,
    projectTitle,
    projectDescription,
    url,
    status,
    amount,
    userId
  } = req.body;
 
  try {
    const Service = await db.freelancerService.create({
      data: { 
        name,
        email,
        address,
        state,
        country,
        linkedin,
        phoneNumber,
        age: Number(age),
        categories,
        projectTitle,
        projectDescription,
        url,
        status,
        amount: parseFloat(amount),
        userId
      },
    });
    res.status(201).json(Service);

  } catch (error) {
    res.status(500).json({ error: "Service creation failed" });
  }
}
export default handler;