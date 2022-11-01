import type { NextApiRequest, NextApiResponse } from "next";
import { getCategories } from "../../../server/categories";
import handleApiResponse from "../../../server/handleApiResponse";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await handleApiResponse(res, getCategories());
      break;
    default:
      res.status(405).end();
      break;
  }
}
