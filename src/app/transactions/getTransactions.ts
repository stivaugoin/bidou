"use server";
import { prisma } from "@/libs/prisma";

export async function getTransactions() {
  return prisma.transaction.findMany({
    orderBy: { date: "desc" },
    select: {
      id: true,
      date: true,
      amount: true,
      category: { select: { name: true } },
    },
  });
}
