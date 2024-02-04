import { prisma } from "@/libs/prisma";
import resetDatabase from "./reset";
import { seedCategories } from "./tables/categories";

async function main() {
  await resetDatabase(prisma);
  await seedCategories(prisma);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
