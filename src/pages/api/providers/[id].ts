import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const providerId = req.query.id;
  if (!providerId || typeof providerId !== "string") {
    res.status(400).end();
    return;
  }

  try {
    await prisma.provider.findFirstOrThrow({ where: { id: providerId } });
  } catch (e) {
    res.status(404).end();
    return;
  }

  switch (req.method) {
    case "DELETE":
      try {
        await prisma.provider.delete({ where: { id: providerId } });
        res.status(200).end();
      } catch (error) {
        console.error(error);
        res.status(500).end();
      }
      break;

    case "GET":
      try {
        const provider = await prisma.provider.findFirst({
          where: { id: providerId },
        });
        res.status(200).json(provider);
      } catch (error) {
        console.error(error);
        res.status(500).end();
      }
      break;

    case "PUT":
      try {
        const { id, ...data } = req.body;
        const provider = await prisma.provider.update({
          where: { id: providerId },
          data,
        });
        res.status(200).json(provider);
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
