import { PrismaClient } from "@prisma/client";

export async function getIncomeTotalByCategory(
  prisma: PrismaClient,
  {
    categoryIds,
  }: {
    categoryIds: string[];
  }
) {
  const transactions = await prisma.transaction.groupBy({
    by: ["categoryId"],
    _sum: { amount: true },
    where: {
      categoryId: { in: categoryIds },
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
