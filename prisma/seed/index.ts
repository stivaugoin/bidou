import { prisma } from "../../src/lib/prisma";
import seedCategories from "./collections/categories";
import seedTransactions from "./collections/transactions";
import resetDatabase from "./reset";

async function main() {
  await resetDatabase(prisma);
  await seedCategories(prisma);
  await seedTransactions(prisma);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
