import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

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
  } catch (e) {
    res.status(404).end();
    return;
  }

  switch (req.method) {
    case "DELETE":
      try {
        await prisma.income.delete({ where: { id: incomeId } });
        res.status(200).end();
      } catch (error) {
        console.error(error);
        res.status(500).end();
      }
      break;

    case "GET":
      try {
        const income = await prisma.income.findFirst({
          where: { id: incomeId },
        });
        res.status(200).json(income);
      } catch (error) {
        console.error(error);
        res.status(500).end();
      }
      break;

    case "PUT":
      try {
        const { id, ...data } = req.body;
        const income = await prisma.income.update({
          where: { id: incomeId },
          data,
        });
        res.status(200).json(income);
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
