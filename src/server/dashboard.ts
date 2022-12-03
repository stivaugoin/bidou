import { CategoryType } from "@prisma/client";
import dayjs from "dayjs";
import { prisma } from "../lib/prisma";

interface Return {
  id: string;
  name: string;
  total: number;
  months: {
    amount: number;
    title: string;
  }[];
}

const MONTH = "MMM YYYY";

async function getIncomeTotalByCategory({
  categoryIds,
}: {
  categoryIds: string[];
}) {
  const transactions = await prisma.transaction.groupBy({
    by: ["categoryId"],
    _sum: { amount: true },
    where: {
      categoryId: { in: categoryIds },
      // Hack. I know deposits are equal since 2019-01-01
      date: { gte: dayjs("2019-01-01").toDate() },
    },
  });

  return transactions.reduce(
    (acc, category) => ({
      ...acc,
      [category.categoryId]: category._sum.amount as number,
    }),
    {} as Record<string, number>
  );
}

async function getIncomeCategories() {
  return prisma.category.findMany({
    select: { id: true, name: true },
    where: { name: { contains: "Deposit" }, type: CategoryType.Income },
  });
}

function getLastThreeMonths() {
  return [...Array(3)].map((_, i) =>
    dayjs().subtract(i, "month").format(MONTH)
  );
}

export async function getDashboardIncomes() {
  const categories = await getIncomeCategories();
  const totalByCategory = await getIncomeTotalByCategory({
    categoryIds: categories.map((c) => c.id),
  });

  const incomes = await prisma.transaction.findMany({
    orderBy: { date: "desc" },
    where: {
      date: { gte: dayjs().subtract(2, "month").startOf("month").toDate() },
    },
  });

  return categories.map((category) => {
    const months = getLastThreeMonths().map((month) => {
      const amount = incomes
        .filter((income) => {
          return (
            income.categoryId === category.id &&
            dayjs(income.date).format(MONTH) === month
          );
        })
        .reduce((acc, transaction) => acc + transaction.amount, 0);

      return { amount, title: month };
    });

    const currentTotal = totalByCategory[category.id] || 0;
    const otherTotal = Object.entries(totalByCategory)
      .filter(([categoryId]) => categoryId !== category.id)
      .reduce((acc, [, amount]) => acc + amount, 0);

    return {
      difference: currentTotal - otherTotal,
      id: category.id,
      title: category.name,
      months,
    };
  });
}

export type ApiGetDashboardIncomes = Awaited<
  ReturnType<typeof getDashboardIncomes>
>;
