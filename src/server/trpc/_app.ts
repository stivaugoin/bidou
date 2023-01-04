import { router } from ".";
import { categoriesRouter } from "./categories";
import { dashboardRouter } from "./dashboard";
import { transactionRouter } from "./transactions";

export const appRouter = router({
  categories: categoriesRouter,
  dashboard: dashboardRouter,
  transactions: transactionRouter,
});

export type AppRouter = typeof appRouter;
