import Myservices from "@/components/my-service/service"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"

export default async function UserDetails(){
    const session = await getServerSession(authOptions)
    const email = session.user.email
    const userId = session.user.id
    return(
        <Myservices userId={userId} email={email} />
    )
}