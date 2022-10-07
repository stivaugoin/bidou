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

  const { name, type } = req.body;
  try {
    const category = await prisma.category.create({
      data: { name, type },
    });

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}
