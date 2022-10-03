import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../../../lib/prisma";

if (!process.env.GOOGLE_ID || !process.env.GOOGLE_SECRET)
  throw new Error("GOOGLE_ID and GOOGLE_SECRET must be set");

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn({ user }) {
      if (!process.env.AUTHORIZED_EMAILS)
        throw new Error("AUTHORIZED_EMAILS must be set");

      return (
        !!user.email &&
        process.env.AUTHORIZED_EMAILS.split(",").includes(user.email)
      );
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
