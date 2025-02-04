  import { AppSidebar } from "@/components/panel/appsidebar";
import {
  SidebarProvider,
} from "@/components/ui/sidebar";
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { redirect } from 'next/navigation'


export default async function HomePage({ children }: any) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return redirect('/sign-in')
  }
  return (
    <>
      <SidebarProvider>
        <AppSidebar session={session} />
              {children}
      </SidebarProvider>
    </>
  );
}
