import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const expenseId = req.query.id;
  if (!expenseId || typeof expenseId !== "string") {
    res.status(400).end();
    return;
  }

  try {
    await prisma.expense.findFirstOrThrow({ where: { id: expenseId } });
  } catch (e) {
    res.status(404).end();
    return;
  }

  switch (req.method) {
    case "DELETE":
      try {
        await prisma.expense.delete({ where: { id: expenseId } });
        res.status(200).end();
      } catch (error) {
        console.error(error);
        res.status(500).end();
      }
      break;

    case "GET":
      try {
        const expense = await prisma.expense.findFirst({
          where: { id: expenseId },
        });
        res.status(200).json(expense);
      } catch (error) {
        console.error(error);
        res.status(500).end();
      }
      break;

    case "PUT":
      try {
        const { id, ...data } = req.body;
        const expense = await prisma.expense.update({
          where: { id: expenseId },
          data,
        });
        res.status(200).json(expense);
      } catch (error) {
        console.error(error);
        res.status(500).end();
      }
      break;

    default:
      res.status(405).end();
      break;
  }
}
