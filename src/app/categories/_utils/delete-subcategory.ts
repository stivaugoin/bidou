"use server";
import { prisma } from "@/libs/prisma";
import { revalidatePath } from "next/cache";

export async function deleteSubcategory(formData: FormData) {
  const categoryId = formData.get("categoryId") as string;
  const id = formData.get("id") as string;
  if (!categoryId || !id) return;

  try {
    await prisma.category.delete({ where: { id } });
  } catch (error) {
    console.error(error);
    return;
  }

  revalidatePath(`/categories/${categoryId}`);
}
