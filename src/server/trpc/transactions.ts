import { CategoryType, Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { procedure, router } from ".";

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
      type: true,
      Parent: {
        select: {
          id: true,
          name: true,
          type: true,
        },
      },
    },
  },
});

export const transactionRouter = router({
  create: procedure
    .input(
      z.object({
        amount: z.number(),
        categoryId: z.string(),
        date: z.date(),
        note: z.string().nullable(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const category = await ctx.prisma.category.findUnique({
        select: { id: true, type: true },
        where: { id: input.categoryId },
      });

      if (!category) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Category not found",
        });
      }

      return ctx.prisma.transaction.create({
        data: {
          amount: Math.round(input.amount * 100),
          categoryId: input.categoryId,
          date: input.date,
          note: input.note,
          type: category.type,
        },
        select: defaultSelect,
      });
    }),

  delete: procedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.transaction.delete({
        select: defaultSelect,
        where: { id: input.id },
      });
    }),

  getByFilters: procedure
    .input(
      z.object({
        categoryId: z.string().optional(),
        page: z.number().min(1),
        type: z.nativeEnum(CategoryType).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const TRANSACTION_PER_PAGE = 30;

      const categoryIds = await (async () => {
        if (!input.categoryId) return null;

        const category = await ctx.prisma.category.findUniqueOrThrow({
          select: { id: true, Children: { select: { id: true } } },
          where: { id: input.categoryId },
        });

        if (category.Children.length === 0) return [category.id];

        return category.Children.map((child) => child.id);
      })();

      const where = {
        ...(categoryIds && { categoryId: { in: categoryIds } }),
        ...(input.type && { type: input.type }),
      };

      const totalTransactions = await ctx.prisma.transaction.count({ where });
      const totalPage = Math.ceil(totalTransactions / TRANSACTION_PER_PAGE);

      const transactions = await ctx.prisma.transaction.findMany({
        orderBy: defaultOrderBy,
        select: defaultSelect,
        skip: (input.page - 1) * TRANSACTION_PER_PAGE,
        take: TRANSACTION_PER_PAGE,
        where,
      });

      return {
        totalPage,
        transactions,
      };
    }),

  update: procedure
    .input(
      z.object({
        id: z.string(),
        amount: z.number(),
        categoryId: z.string(),
        date: z.date(),
        note: z.string().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const category = await ctx.prisma.category.findUnique({
        select: { id: true, type: true },
        where: { id: input.categoryId },
      });

      if (!category) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Category not found",
        });
      }

      return ctx.prisma.transaction.update({
        data: {
          amount: Math.round(input.amount * 100),
          categoryId: input.categoryId,
          date: input.date,
          note: input.note,
          type: category.type,
        },
        select: defaultSelect,
        where: { id: input.id },
      });
    }),
});

export type TransactionRouter = typeof transactionRouter;
