import type { NextApiRequest, NextApiResponse } from "next";
import { getExpenses } from "../../../server/expenses";
import handleApiResponse from "../../../server/handleApiResponse";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await handleApiResponse(res, getExpenses());
      break;
    default:
      res.status(405).end();
      break;
  }
}
