import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";
import {
  deleteCategory,
  getCategory,
  updateCategory,
} from "../../../../server/categories";
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
    case "DELETE":
      await handleApiResponse(res, deleteCategory(categoryId));
      break;
    case "GET":
      await handleApiResponse(res, getCategory(categoryId));
      break;
    case "PUT":
      const { id, ...data } = req.body;
      await handleApiResponse(res, updateCategory(categoryId, data));
      break;
    default:
      res.status(405).end();
      break;
  }
}
