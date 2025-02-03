import NextAuth, { getServerSession, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import db from "../../../prisma/db";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt' as SessionStrategy,
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Credentials not provided");
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (user && user.password) {
          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (isValid) return user;
        }

        throw new Error("Invalid credentials");
      }
    })
  ],
  callbacks: {
		async jwt({ token, user }:any) {
			if (user) {
				token.id = user.id;
				token.role = user.role; // Store role in the token
			}
			return token;
		},
		async session({ session, token }:any) {
			if (token) {
				session.user.id = token.id;
				session.user.role = token.role; // Attach role to the session
			}
			return session;
		},
		async redirect({ url, baseUrl }:any) {
			// Redirect users based on role
			if (url.startsWith(baseUrl)) return url;
			return baseUrl;
		},
	},
  debug: process.env.NEXT_PUBLIC_ENV === 'development',
};

// This is the key change - export the default function
export default NextAuth(authOptions);

export const getAuthSession = () => {
  return getServerSession(authOptions);
};