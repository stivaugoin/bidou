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
        if (
          process.env.NODE_ENV !== "production" &&
          credentials?.password === "password"
        ) {
          return {};
        }

        if (credentials?.password === process.env.AUTH_PASSWORD) {
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
