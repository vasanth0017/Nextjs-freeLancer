import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import React from 'react'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  if (session.user.role !== 'admin') {
    return <h1>Unauthorized</h1>
  }
  

  return <>welcome admin</>
}
