import type { NextApiRequest, NextApiResponse } from "next";
import { createExpense } from "../../../server/expenses";
import handleApiResponse from "../../../server/handleApiResponse";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      await handleApiResponse(res, createExpense(req.body));
      break;
    default:
      res.status(405).end();
      break;
  }
}
