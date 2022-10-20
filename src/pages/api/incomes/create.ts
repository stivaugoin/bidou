import type { NextApiRequest, NextApiResponse } from "next";
import handleApiResponse from "../../../server/handleApiResponse";
import { createIncome } from "../../../server/incomes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      await handleApiResponse(res, createIncome(req.body));
      break;
    default:
      res.status(405).end();
      break;
  }
}
