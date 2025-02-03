import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";

export const getAuthSession = () => {
  return getServerSession(authOptions);
};