import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const categoryId = req.query.id;
  if (!categoryId || typeof categoryId !== "string") {
    res.status(400).end();
    return;
  }

  try {
    await prisma.category.findFirstOrThrow({ where: { id: categoryId } });
  } catch (e) {
    res.status(404).end();
    return;
  }

  switch (req.method) {
    case "DELETE":
      try {
        await prisma.category.delete({ where: { id: categoryId } });
        res.status(200).end();
      } catch (error) {
        console.error(error);
        res.status(500).end();
      }
      break;

    case "GET":
      try {
        const category = await prisma.category.findFirst({
          where: { id: categoryId },
        });
        res.status(200).json(category);
      } catch (error) {
        console.error(error);
        res.status(500).end();
      }
      break;

    case "PUT":
      try {
        const { id, ...data } = req.body;
        const category = await prisma.category.update({
          where: { id: categoryId },
          data,
        });
        res.status(200).json(category);
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
