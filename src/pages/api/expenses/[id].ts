import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import {
  deleteExpense,
  getExpense,
  updateExpense,
} from "../../../server/expenses";
import handleApiResponse from "../../../server/handleApiResponse";

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
  } catch (err) {
    res.status(404).end();
    return;
  }

  switch (req.method) {
    case "DELETE":
      await handleApiResponse(res, deleteExpense(expenseId));
      break;
    case "GET":
      await handleApiResponse(res, getExpense(expenseId));
      break;
    case "PUT":
      const { id, ...data } = req.body;
      await handleApiResponse(res, updateExpense(expenseId, data));
      break;
    default:
      res.status(405).end();
      break;
  }
}
