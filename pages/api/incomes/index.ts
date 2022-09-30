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
    const incomes = await getAllIncomes();

    res.status(200).json(incomes);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}

export type ApiGetAllIncomes = Awaited<ReturnType<typeof getAllIncomes>>;

async function getAllIncomes() {
  return groupTransactionsByMonth(
    await prisma.income.findMany({
      select: {
        id: true,
        amount: true,
        date: true,
        Category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { date: "desc" },
    })
  );
}
