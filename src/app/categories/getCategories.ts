"use server";
import { prisma } from "@/libs/prisma";

export async function getCategories() {
  return prisma.category.findMany({
    include: {
      _count: { select: { children: true } },
    },
    orderBy: { name: "asc" },
    where: { parentId: null },
  });
}
