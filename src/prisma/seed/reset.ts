import type { PrismaClient } from "@prisma/client";

export default async function resetDatabase(db: PrismaClient) {
  console.info(" => Resetting database...");

  await db.expense.deleteMany({});
  await db.category.deleteMany({});
  await db.income.deleteMany({});

  console.info(" => Resetting database... [DONE]");
}
