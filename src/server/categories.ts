import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

const select = {
  id: true,
  name: true,
  type: true,
  Children: { select: { id: true, name: true } },
  Parent: { select: { id: true, name: true } },
};

export async function createCategory(data: Prisma.CategoryCreateInput) {
  return prisma.category.create({ data, select });
}

export async function deleteCategory(id: string) {
  return prisma.category.delete({ where: { id }, select });
}

export async function getCategories() {
  return prisma.category.findMany({ orderBy: { name: "asc" }, select });
}

export async function getCategory(id: string) {
  return prisma.category.findFirstOrThrow({ select, where: { id } });
}

export async function updateCategory(
  id: string,
  data: Prisma.CategoryUpdateInput
) {
  return prisma.category.update({ data, select, where: { id } });
}

export type ApiCreateCategory = Awaited<ReturnType<typeof createCategory>>;
export type ApiDeleteCategory = Awaited<ReturnType<typeof deleteCategory>>;
export type ApiGetCategory = Awaited<ReturnType<typeof getCategory>>;
export type ApiGetCategories = Awaited<ReturnType<typeof getCategories>>;
export type ApiUpdateCategory = Awaited<ReturnType<typeof updateCategory>>;
