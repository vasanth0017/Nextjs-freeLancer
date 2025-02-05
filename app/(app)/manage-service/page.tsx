import CreateService from "@/components/create-service/create-service"
import UserDetail from "@/components/userDetails/Userdetails"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"

export default async function Manageservice(){
    const session = await getServerSession(authOptions)
    const userId = session.user.id
    return(
       <CreateService userId={userId.toString()} />
    )
}