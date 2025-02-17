import Details from "@/components/service-details/details";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function ServiceDetail() {
     const session = await getServerSession(authOptions)
        const userId = session?.user?.id
        const name = session?.user?.name
        const role =session?.user?.role
  return(
    <Details userId={userId} senderName={name} role={role} />
  )  
}