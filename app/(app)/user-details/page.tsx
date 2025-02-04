import UserDetail from "@/components/userDetails/Userdetails"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"

export default async function UserDetails(){
    const session = await getServerSession(authOptions)
    const email = session.user.email
    return(
        <UserDetail email={email}/>
    )
}