import { CategoryType } from "@prisma/client";
import dayjs from "dayjs";
import { prisma } from "../lib/prisma";
import { groupTransactionsByMonth } from "../utils/groupTransactionsByMonth";

export async function createIncome(data: {
  amount: number;
  categoryId: string;
  date: Date;
  note?: string;
}) {
  const { amount, categoryId, date, note } = data;

  const category = await prisma.category.findFirstOrThrow({
    where: { id: categoryId, type: CategoryType.Income },
  });

  return prisma.income.create({
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

export async function deleteIncome(id: string) {
  return prisma.income.delete({ where: { id } });
}

export async function getIncome(id: string) {
  const income = await prisma.income.findUniqueOrThrow({
    select: {
      id: true,
      amount: true,
      date: true,
      note: true,
      Category: { select: { id: true, name: true } },
    },
    where: { id },
  });

  return {
    ...income,
    date: dayjs(income.date).format(),
  };
}

export async function getIncomes() {
  return groupTransactionsByMonth(
    await prisma.income.findMany({
      select: {
        id: true,
        amount: true,
        date: true,
        Category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { date: "desc" },
    })
  );
}

export async function updateIncome(
  id: string,
  data: {
    amount?: number;
    categoryId?: string;
    date?: Date;
    note?: string | null;
  }
) {
  return prisma.income.update({
    where: { id },
    data,
  });
}

export type ApiCreateIncome = Awaited<ReturnType<typeof createIncome>>;
export type ApiDeleteIncome = Awaited<ReturnType<typeof deleteIncome>>;
export type ApiGetIncome = Awaited<ReturnType<typeof getIncome>>;
export type ApiGetIncomes = Awaited<ReturnType<typeof getIncomes>>;
export type ApiUpdateIncome = Awaited<ReturnType<typeof updateIncome>>;
