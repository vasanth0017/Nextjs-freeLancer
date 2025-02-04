import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { redirect } from 'next/navigation'

export default async function SigninPage({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
    // if (session) {
    //   return redirect('/')
    // }
  return <>{children}</>
  }
  