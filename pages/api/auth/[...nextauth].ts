import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
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

      // e2e tests use a fake email address
      if (
        process.env.NODE_ENV !== "production" &&
        user.email === process.env.E2E_USER_EMAIL
      )
        return true;

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

    ...(process.env.NODE_ENV === "production"
      ? [] // no credentials provider in production
      : [
          // credentials provider for e2e tests
          CredentialsProvider({
            name: "Credentials",
            credentials: {
              email: { label: "Email", type: "email" },
              password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
              const res = await fetch(
                `${process.env.E2E_BASE_URL}/api/e2e/login`,
                {
                  method: "POST",
                  body: JSON.stringify({
                    email: credentials?.email,
                    password: credentials?.password,
                  }),
                  headers: { "Content-Type": "application/json" },
                }
              );

              try {
                if (!res.ok) return null;
                const user = await res.json();
                return user;
              } catch (e) {
                console.error(e);
                return null;
              }
            },
          }),
        ]),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
