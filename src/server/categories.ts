import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { groupTransactionsByMonth } from "../utils/groupTransactionsByMonth";

const select = {
  id: true,
  name: true,
  type: true,
  Children: { select: { id: true, name: true } },
  Parent: { select: { id: true, name: true } },
};

export async function createCategory(data: Prisma.CategoryCreateInput) {
  return prisma.category.create({ data, select });
}

export async function deleteCategory(id: string) {
  return prisma.category.delete({ where: { id }, select });
}

export async function getCategories() {
  return prisma.category.findMany({ orderBy: { name: "asc" }, select });
}

export async function getCategory(id: string) {
  return prisma.category.findFirstOrThrow({ select, where: { id } });
}

export async function getCategoryTransactions(categoryId: string) {
  const select = Prisma.validator<Prisma.TransactionSelect>()({
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
        Parent: { select: { id: true, name: true } },
      },
    },
  });

  const category = await prisma.category.findUniqueOrThrow({
    select: { type: true },
    where: { id: categoryId },
  });

  const transactions = await prisma.transaction.findMany({
    orderBy: { date: "desc" },
    select,
    where: { categoryId },
  });

  if (transactions.length > 0) {
    return groupTransactionsByMonth(transactions);
  }

  const children = await prisma.category.findMany({
    select: { id: true },
    where: { parentId: categoryId },
  });

  return groupTransactionsByMonth(
    await prisma.transaction.findMany({
      orderBy: { date: "desc" },
      select,
      where: { categoryId: { in: children.map(({ id }) => id) } },
    })
  );
}

export async function updateCategory(
  id: string,
  data: Prisma.CategoryUpdateInput
) {
  const category = await prisma.category.findFirstOrThrow({
    select: { type: true },
    where: { id },
  });

  if (data.type !== category.type) {
    throw new Error("Cannot change category type");
  }

  return prisma.category.update({ data, select, where: { id } });
}

export type ApiCreateCategory = Awaited<ReturnType<typeof createCategory>>;
export type ApiDeleteCategory = Awaited<ReturnType<typeof deleteCategory>>;
export type ApiGetCategory = Awaited<ReturnType<typeof getCategory>>;
export type ApiGetCategoryTransactions = Awaited<
  ReturnType<typeof getCategoryTransactions>
>;
export type ApiGetCategories = Awaited<ReturnType<typeof getCategories>>;
export type ApiUpdateCategory = Awaited<ReturnType<typeof updateCategory>>;
