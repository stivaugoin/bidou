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
    const providers = await getAllProviders();
    res.status(200).json(providers);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}

export type ApiGetAllProviders = Awaited<ReturnType<typeof getAllProviders>>;

async function getAllProviders() {
  return prisma.provider.findMany({
    select: {
      id: true,
      name: true,
      Category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: { name: "asc" },
  });
}
