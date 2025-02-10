import ClientDashboard from "@/components/client-dashboard/Dashboard";
import PlaceholderContent from "@/components/demo/placeholder-content";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getContractDetails } from "@/services/apicall";
import { getServerSession } from "next-auth";

// app/about/page.tsx
export default async function Dashboard() {
  const session = await getServerSession(authOptions)
      
      const userId = session?.user?.id
      const role = session?.user?.role
      let contractDetails = null;
      try {
        if (userId) {
          contractDetails = await getContractDetails(userId);
        }
      } catch (error) {
        console.error("Error during fetching contract details:", error);
      }
    return (
      <>
        {role === 'client' ? <ClientDashboard contractDetails={contractDetails || []} /> : <PlaceholderContent />}
      </>
    );
    }
   
  