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

  const { name, categoryId } = req.body;
  try {
    const provider = await prisma.provider.create({
      data: { name, categoryId },
    });
    res.status(200).json(provider);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}
