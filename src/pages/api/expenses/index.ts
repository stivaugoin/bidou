import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { groupTransactionsByMonth } from "../../../utils/groupTransactionsByMonth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }

  try {
    const expenses = await getAllExpenses();

    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}

export type ApiGetAllExpenses = Awaited<ReturnType<typeof getAllExpenses>>;

async function getAllExpenses() {
  return groupTransactionsByMonth(
    await prisma.expense.findMany({
      select: {
        id: true,
        amount: true,
        date: true,

        Category: {
          select: {
            id: true,
            name: true,
            Parent: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: { date: "desc" },
    })
  );
}
