import AlluserService from "@/components/allUser-service/Alluser-Service"
import ServiceContract from "@/components/service-contract/Contract"
import UserDetail from "@/components/userDetails/Userdetails"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"

export default async function UserDetails(){
    const session = await getServerSession(authOptions)
    const email = session?.user?.email
    const userId = session?.user?.id
    const role = session?.user?.role
    return(
        <ServiceContract email={email} role={role} userId={userId} />
    )
}