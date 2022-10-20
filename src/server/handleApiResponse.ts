import { NextApiResponse } from "next";

export default async function handleApiResponse<T>(
  res: NextApiResponse,
  promise: Promise<T>
) {
  try {
    const response = await promise;
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}
