import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import handleApiResponse from "../../../server/handleApiResponse";
import { deleteIncome, getIncome, updateIncome } from "../../../server/incomes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const incomeId = req.query.id;
  if (!incomeId || typeof incomeId !== "string") {
    res.status(400).end();
    return;
  }

  try {
    await prisma.income.findFirstOrThrow({ where: { id: incomeId } });
  } catch (err) {
    res.status(404).end();
    return;
  }

  switch (req.method) {
    case "DELETE":
      await handleApiResponse(res, deleteIncome(incomeId));
      break;
    case "GET":
      await handleApiResponse(res, getIncome(incomeId));
      break;
    case "PUT":
      const { id, ...data } = req.body;
      await handleApiResponse(res, updateIncome(incomeId, data));
      break;
    default:
      res.status(405).end();
      break;
  }
}
