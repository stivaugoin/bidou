import type { NextApiRequest, NextApiResponse } from "next";
import { getDashboardIncomes } from "../../../server/dashboard";
import handleApiResponse from "../../../server/handleApiResponse";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await handleApiResponse(res, getDashboardIncomes());
      break;
    default:
      res.status(405).end();
      break;
  }
}
