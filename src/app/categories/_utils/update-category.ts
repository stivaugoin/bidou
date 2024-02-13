"use server";
import { prisma } from "@/libs/prisma";
import { CategoryType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateCategory(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const type = formData.get("type") as CategoryType;
  const parentId = formData.get("parentId") as string;

  try {
    await prisma.category.update({
      where: { id },
      data: {
        name,
        type,
        parentId: parentId || undefined,
      },
    });

    // Update subcategories to match the new category type
    await prisma.category.updateMany({
      where: { parentId: id },
      data: { type },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update category");
  }

  revalidatePath(`/categories/${id}`);
}
