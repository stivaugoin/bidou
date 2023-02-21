import { initTRPC, TRPCError } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { unstable_getServerSession } from "next-auth";
import superjson from "superjson";
import { prisma } from "../../lib/prisma";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

export const createContext = async (_opts: CreateNextContextOptions) => {
  const { req, res } = _opts;
  const session = await unstable_getServerSession(req, res, authOptions);

  return {
    prisma,
    session,
  };
};

const t = initTRPC.context<Awaited<ReturnType<typeof createContext>>>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

const isAuthenticated = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user) throw new TRPCError({ code: "UNAUTHORIZED" });

  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const router = t.router;
export const procedure = t.procedure.use(isAuthenticated);
