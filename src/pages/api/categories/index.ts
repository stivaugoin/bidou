import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }

  try {
    const categories = await getAllCategories();

    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}

export type ApiGetAllCategories = Awaited<ReturnType<typeof getAllCategories>>;

async function getAllCategories() {
  return prisma.category.findMany({
    select: {
      id: true,
      name: true,
      type: true,
      Parent: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: { name: "asc" },
  });
}
