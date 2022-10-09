import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const { amount, date, note, categoryId } = req.body;
  try {
    const category = await prisma.category.findFirstOrThrow({
      where: { id: categoryId },
    });

    const expense = await prisma.expense.create({
      data: {
        amount,
        date,
        note,
        Category: {
          connect: { id: category.id },
        },
      },
    });

    res.status(200).json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}
