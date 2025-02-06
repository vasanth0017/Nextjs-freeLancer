import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function getSessionData() {
  const session = await getServerSession(authOptions);
  return session;
}
