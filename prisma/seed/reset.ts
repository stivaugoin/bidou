import type { PrismaClient } from "@prisma/client";

export default async function resetDatabase(db: PrismaClient) {
  console.info(" => Resetting database...");

  await db.expense.deleteMany({});
  await db.income.deleteMany({});
  await db.category.deleteMany({});

  console.info(" => Resetting database... [DONE]");
}
