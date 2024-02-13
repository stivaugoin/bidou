"use server";
import { prisma } from "@/libs/prisma";
import { CategoryType } from "@prisma/client";
import { redirect } from "next/navigation";

export async function createSubcategory(formData: FormData) {
  const name = formData.get("name") as string;
  const parentId = formData.get("parentId") as string;
  const type = formData.get("type") as CategoryType | "";

  if (!name || !type || !parentId) return;

  try {
    await prisma.category.create({ data: { name, type, parentId } });
  } catch (error) {
    console.error(error);
    return;
  }

  redirect(`/categories/${parentId}`);
}
