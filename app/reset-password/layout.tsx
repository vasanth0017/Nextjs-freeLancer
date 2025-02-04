import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { redirect } from 'next/navigation'

export default async function ResetPassword({ children }: { children: React.ReactNode }) {
  return <>{children}</>
  }
  