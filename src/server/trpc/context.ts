import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { prisma } from "../../lib/prisma";

export async function createContext(opts?: trpcNext.CreateNextContextOptions) {
  return { prisma };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
