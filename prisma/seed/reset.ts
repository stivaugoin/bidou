import type { PrismaClient } from "@prisma/client";

export default async function resetDatabase(db: PrismaClient) {
  console.info(" => Resetting database...");

  const deleteExpenses = db.expense.deleteMany();
  const deleteIncomes = db.income.deleteMany();
  const deleteChildrenCategories = db.category.deleteMany({
    where: { parentId: { not: null } },
  });
  const deleteParentCategories = db.category.deleteMany({});

  await db.$transaction([
    deleteExpenses,
    deleteIncomes,
    deleteChildrenCategories,
    deleteParentCategories,
  ]);

  console.info(" => Resetting database... [DONE]");
}
