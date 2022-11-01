import type { NextApiRequest, NextApiResponse } from "next";
import { createCategory } from "../../../server/categories";
import handleApiResponse from "../../../server/handleApiResponse";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      await handleApiResponse(res, createCategory(req.body));
      break;
    default:
      res.status(405).end();
      break;
  }
}
