"use server";
import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";

export async function deleteCategory(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;

  const category = await prisma.category.findUniqueOrThrow({
    select: { id: true, _count: { select: { children: true } } },
    where: { id },
  });

  if (category._count.children !== 0) {
    throw new Error("Cannot delete a category with children");
  }

  try {
    await prisma.category.delete({ where: { id } });
  } catch (error) {
    console.error(error);
    return;
  }

  redirect("/categories");
}
