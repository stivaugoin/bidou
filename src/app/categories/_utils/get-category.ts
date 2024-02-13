import { prisma } from "@/libs/prisma";

export async function getCategory(categoryId: string) {
  return prisma.category.findUniqueOrThrow({
    where: { id: categoryId },
    include: {
      parent: true,
      children: true,
    },
  });
}
