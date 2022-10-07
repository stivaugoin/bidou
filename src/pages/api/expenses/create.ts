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

  const { amount, date, note, providerId } = req.body;
  try {
    const provider = await prisma.provider.findFirstOrThrow({
      where: { id: providerId },
    });

    const expense = await prisma.expense.create({
      data: {
        amount,
        date,
        note,
        Provider: {
          connect: { id: provider.id },
        },
      },
    });

    res.status(200).json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}
