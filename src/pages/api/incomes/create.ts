import { CategoryType } from "@prisma/client";
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

  const { amount, categoryId, date, note } = req.body;
  try {
    const category = await prisma.category.findFirstOrThrow({
      where: { id: categoryId, type: CategoryType.Income },
    });

    const income = await prisma.income.create({
      data: {
        amount,
        date,
        note,
        Category: {
          connect: { id: category.id },
        },
      },
    });

    res.status(200).json(income);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}
