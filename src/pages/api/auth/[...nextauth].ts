import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Password",
      credentials: {
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { AUTH_PASSWORD, NODE_ENV, VERCEL_ENV } = process.env;
        if (
          (NODE_ENV !== "production" || VERCEL_ENV === "preview") &&
          credentials?.password === "password"
        ) {
          return {};
        }

        if (credentials?.password === AUTH_PASSWORD) {
          return {};
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
