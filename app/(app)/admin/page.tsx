import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  console.log('session', session)
  // if (session) {
  //   return redirect('/admin')
  // }

  return <>welcome admin</>
}
