import type { NextApiRequest, NextApiResponse } from "next";
import handleApiResponse from "../../../server/handleApiResponse";
import { getIncomes } from "../../../server/incomes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await handleApiResponse(res, getIncomes());
      break;
    default:
      res.status(405).end();
      break;
  }
}
