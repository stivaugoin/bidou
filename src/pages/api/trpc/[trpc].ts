import * as trpcNext from "@trpc/server/adapters/next";
import { createContext } from "../../../server/trpc";
import { appRouter } from "../../../server/trpc/routers";

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
