import { CategoryType, Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { procedure, router } from ".";

const defaultOrderBy =
  Prisma.validator<Prisma.CategoryOrderByWithRelationInput>()({
    name: "asc",
  });

const defaultSelect = Prisma.validator<Prisma.CategorySelect>()({
  id: true,
  name: true,
  type: true,
  parentId: true,
  Children: {
    orderBy: defaultOrderBy,
    select: {
      id: true,
      name: true,
      parentId: true,
      type: true,
    },
  },
  Parent: {
    select: {
      id: true,
      name: true,
    },
  },
});

export const categoriesRouter = router({
  create: procedure
    .input(
      z.object({
        name: z.string().min(1),
        type: z.nativeEnum(CategoryType),
        parentId: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (input.parentId) {
        const parentCategory = await ctx.prisma.category.findFirst({
          select: { id: true },
          where: { id: input.parentId, type: input.type },
        });

        if (!parentCategory) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Parent category not found",
          });
        }
      }

      return ctx.prisma.category.create({
        data: {
          name: input.name,
          type: input.type,
          ...(input.parentId && { parentId: input.parentId }),
        },
        select: defaultSelect,
      });
    }),

  delete: procedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const category = await ctx.prisma.category.findFirstOrThrow({
        select: {
          id: true,
          Children: { select: { id: true } },
          Transactions: { select: { id: true } },
        },
        where: { id: input.id },
      });

      if (category.Transactions.length > 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Cannot delete category with transactions",
        });
      }

      if (category.Children.length > 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Cannot delete category with subcategories",
        });
      }

      return ctx.prisma.category.delete({
        select: defaultSelect,
        where: { id: category.id },
      });
    }),

  getAll: procedure.query(async ({ ctx }) => {
    return ctx.prisma.category.findMany({
      select: defaultSelect,
      orderBy: { name: "asc" },
    });
  }),

  update: procedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        parentId: z.string().optional(),
        type: z.nativeEnum(CategoryType),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (input.parentId) {
        const parentCategory = await ctx.prisma.category.findFirst({
          select: { id: true },
          where: { id: input.parentId },
        });

        if (!parentCategory) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Parent category not found",
          });
        }
      }

      return ctx.prisma.category.update({
        data: {
          name: input.name,
          parentId: input.parentId || null,
          type: input.type,
        },
        select: defaultSelect,
        where: { id: input.id },
      });
    }),
});

export type CategoriesRouter = typeof categoriesRouter;
