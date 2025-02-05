// pages/api/freelauncer-services/update-service.ts
import db from "@/prisma/db";

const handler = async (req: any, res: any) => {
  if (req.method !== "PUT") return res.status(405).end();
  
  const { 
    serviceId,  // Add serviceId to identify which service to update
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
    amount
  } = req.body;

  // Validate serviceId
  if (!serviceId) {
    return res.status(400).json({ error: "Service ID is required for update" });
  }

  try {
    const updatedService = await db.freelancerService.update({
      where: { id: serviceId },
      data: { 
        name,
        email,
        address,
        state,
        country,
        linkedin,
        phoneNumber,
        age: age ? Number(age) : undefined,
        categories,
        projectTitle,
        projectDescription,
        url,
        status,
        amount: amount ? parseFloat(amount) : undefined
      },
    });

    res.status(200).json(updatedService);

  } catch (error) {
    console.error("Service update error:", error);
    res.status(500).json({ 
      error: "Service update failed", 
      details: error instanceof Error ? error.message : "Unknown error" 
    });
  }
};

export default handler;