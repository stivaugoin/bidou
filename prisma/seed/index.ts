import { prisma } from "@/libs/prisma";
import resetDatabase from "./reset";
import { seedCategories } from "./tables/categories";
import seedTransactions from "./tables/transactions";

async function main() {
  await resetDatabase(prisma);
  await seedCategories(prisma);
  await seedTransactions(prisma);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
