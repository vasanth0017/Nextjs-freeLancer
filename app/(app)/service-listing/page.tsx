import AlluserService from "@/components/allUser-service/Alluser-Service"
import UserDetail from "@/components/userDetails/Userdetails"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"

export default async function UserDetails(){
    const session = await getServerSession(authOptions)
    return(
        <AlluserService session={session} />
    )
}