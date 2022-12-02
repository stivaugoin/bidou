import { router } from ".";
import { transactionRouter } from "./transactions";

export const appRouter = router({
  transactions: transactionRouter,
});

export type AppRouter = typeof appRouter;
