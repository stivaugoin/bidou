import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.NODE_ENV === "production") {
    res.status(404).end();
    return;
  }

  if (
    !process.env.E2E_USER_EMAIL ||
    !process.env.E2E_USER_NAME ||
    !process.env.E2E_USER_PASSWORD
  )
    throw new Error(
      "E2E_USER_EMAIL and process.env.E2E_USER_NAME and E2E_USER_PASSWORD must be set"
    );

  const { email, password } = req.body;
  const { E2E_USER_EMAIL, E2E_USER_NAME, E2E_USER_PASSWORD } = process.env;

  if (email !== E2E_USER_EMAIL || password !== E2E_USER_PASSWORD) {
    res.status(401).end();
    return;
  }

  res.status(200).json({
    email: E2E_USER_EMAIL,
    name: E2E_USER_NAME,
  });
}
