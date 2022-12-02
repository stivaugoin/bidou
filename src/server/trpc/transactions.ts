import { CategoryType, Prisma } from "@prisma/client";
import { z } from "zod";
import { procedure, router } from ".";
import { groupTransactionsByMonth } from "../../utils/groupTransactionsByMonth";

const defaultOrderBy =
  Prisma.validator<Prisma.TransactionOrderByWithRelationInput>()({
    date: "desc",
  });

const defaultSelect = Prisma.validator<Prisma.TransactionSelect>()({
  id: true,
  amount: true,
  categoryId: true,
  date: true,
  note: true,
  type: true,
  // TODO: Remove this relation and use a separate query to get the category
  Category: {
    select: {
      id: true,
      name: true,
      Parent: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
});

export const transactionRouter = router({
  getByType: procedure
    .input(z.object({ type: z.nativeEnum(CategoryType) }))
    .query(async ({ input, ctx }) => {
      const transactions = await ctx.prisma.transaction.findMany({
        select: defaultSelect,
        orderBy: defaultOrderBy,
        where: { type: input.type },
      });

      return groupTransactionsByMonth(transactions);
    }),
});

export type TransactionRouter = typeof transactionRouter;
