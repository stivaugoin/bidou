import { CategoryType } from "@prisma/client";
import dayjs from "dayjs";
import { prisma } from "../lib/prisma";
import { groupTransactionsByMonth } from "../utils/groupTransactionsByMonth";

export async function createExpense(data: {
  amount: number;
  categoryId: string;
  date: Date;
  note?: string;
}) {
  const { amount, categoryId, date, note } = data;

  const category = await prisma.category.findFirstOrThrow({
    where: { id: categoryId, type: CategoryType.Expense },
  });

  return prisma.expense.create({
    data: {
      amount,
      date,
      note,
      Category: {
        connect: { id: category.id },
      },
    },
  });
}

export async function deleteExpense(id: string) {
  return prisma.expense.delete({ where: { id } });
}

export async function getExpense(id: string) {
  const expense = await prisma.expense.findUniqueOrThrow({
    select: {
      id: true,
      amount: true,
      date: true,
      note: true,
      Category: {
        select: {
          id: true,
          name: true,
          Parent: { select: { id: true, name: true } },
        },
      },
    },
    where: { id },
  });

  return {
    ...expense,
    date: dayjs(expense.date).format(),
  };
}

export async function getExpenses() {
  return groupTransactionsByMonth(
    await prisma.expense.findMany({
      select: {
        id: true,
        amount: true,
        date: true,
        Category: {
          select: {
            id: true,
            name: true,
            Parent: { select: { id: true, name: true } },
          },
        },
      },
      orderBy: { date: "desc" },
    })
  );
}

export async function updateExpense(
  id: string,
  data: {
    amount?: number;
    categoryId?: string;
    date?: Date;
    note?: string | null;
  }
) {
  return prisma.expense.update({
    where: { id },
    data,
  });
}

export type ApiCreateExpense = Awaited<ReturnType<typeof createExpense>>;
export type ApiDeleteExpense = Awaited<ReturnType<typeof deleteExpense>>;
export type ApiGetExpense = Awaited<ReturnType<typeof getExpense>>;
export type ApiGetExpenses = Awaited<ReturnType<typeof getExpenses>>;
export type ApiUpdateExpense = Awaited<ReturnType<typeof updateExpense>>;
