import { CategoryType, PrismaClient } from "@prisma/client";

export async function getIncomeCategories(prisma: PrismaClient) {
  return prisma.category.findMany({
    select: { id: true, name: true },
    where: { name: { contains: "Deposit" }, type: CategoryType.Income },
  });
}
