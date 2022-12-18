import { router } from ".";
import { categoriesRouter } from "./categories";
import { transactionRouter } from "./transactions";

export const appRouter = router({
  categories: categoriesRouter,
  transactions: transactionRouter,
});

export type AppRouter = typeof appRouter;
