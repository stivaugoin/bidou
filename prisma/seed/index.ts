import { prisma } from "../../src/lib/prisma";
import seedCategories from "./collections/categories";
import seedExpenses from "./collections/expenses";
import seedIncomes from "./collections/incomes";
import resetDatabase from "./reset";

async function main() {
  await resetDatabase(prisma);
  await seedCategories(prisma);
  await seedExpenses(prisma);
  await seedIncomes(prisma);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
