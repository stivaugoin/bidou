import { CategoryType } from "@prisma/client";
import { MongoClient } from "mongodb";
import { getDatabaseName } from "../utils/getDatabaseName";

export default async function main() {
  const { DATABASE_URL, RESET_TRANSACTIONS = false } = process.env;

  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  const client = new MongoClient(DATABASE_URL);
  await client.connect();

  const dbName = getDatabaseName(DATABASE_URL);
  const db = client.db(dbName);

  const collections = {
    category: db.collection("Category"),
    expense: db.collection("Expense"),
    income: db.collection("Income"),
    transaction: db.collection("Transaction"),
  };

  if (RESET_TRANSACTIONS) {
    try {
      await db.dropCollection("Income");
    } catch (e) {}
  }

  const expenses = await collections.expense.find().toArray();
  const incomes = await collections.income.find().toArray();

  if (expenses.length === 0 && incomes.length === 0) return;

  try {
    await collections.category.updateMany(
      {},
      { $set: { createdAt: new Date() } }
    );

    await collections.transaction.insertMany([
      ...expenses.map((t) => ({
        ...t,
        createdAt: t.date,
        type: CategoryType.Expense,
      })),
      ...incomes.map((t) => ({
        ...t,
        createdAt: t.date,
        type: CategoryType.Income,
      })),
    ]);
  } catch (e) {}

  await client.close();
}
