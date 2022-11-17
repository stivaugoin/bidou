import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";
import { getCategoryTransactions } from "../../../../server/categories";
import handleApiResponse from "../../../../server/handleApiResponse";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { categoryId } = req.query;
  if (!categoryId || typeof categoryId !== "string") {
    res.status(400).end();
    return;
  }

  try {
    await prisma.category.findFirstOrThrow({ where: { id: categoryId } });
  } catch (err) {
    res.status(404).end();
    return;
  }

  switch (req.method) {
    case "GET":
      await handleApiResponse(res, getCategoryTransactions(categoryId));
      break;

    default:
      res.status(405).end();
      break;
  }
}
