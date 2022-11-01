import type { NextApiRequest, NextApiResponse } from "next";
import { createCategory } from "../../../server/categories";
import handleApiResponse from "../../../server/handleApiResponse";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const { name, type, parentId } = req.body;
      await handleApiResponse(
        res,
        createCategory({
          name,
          type,
          ...(parentId && { Parent: { connect: { id: parentId } } }),
        })
      );
      break;
    default:
      res.status(405).end();
      break;
  }
}
