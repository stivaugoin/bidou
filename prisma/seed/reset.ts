import type { PrismaClient } from "@prisma/client";
import logUpdate from "log-update";

export default async function resetDatabase(db: PrismaClient) {
  logUpdate("⏳ Resetting database...");

  const deleteTransactions = db.transaction.deleteMany();
  const deleteChildrenCategories = db.category.deleteMany({
    where: { parentId: { not: null } },
  });
  const deleteParentCategories = db.category.deleteMany({});

  await db.$transaction([
    deleteTransactions,
    deleteChildrenCategories,
    deleteParentCategories,
  ]);

  logUpdate("✅ Database reset");
  logUpdate.done();
}
