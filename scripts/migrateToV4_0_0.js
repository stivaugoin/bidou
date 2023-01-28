import { CategoryType } from "@prisma/client";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import logUpdate from "log-update";

dotenv.config();

const { DATABASE_URL, RESET_TRANSACTIONS = false } = process.env;

if (!DATABASE_URL) {
  throw new Error("Missing environment variables");
}

const dbName = DATABASE_URL.split("/").at(-1);

console.info(" == Migrating database to v4.0.0 ==");
console.info(" -> Converting incomes and expenses to transactions");
console.info("");

// Connection URL
const client = new MongoClient(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function main() {
  logUpdate(" ⏳ Connecting to server");
  await client.connect();
  logUpdate(" ✅ Connecting to server");
  logUpdate.done();

  const db = client.db(dbName);

  const collections = {
    expenses: db.collection("Expense"),
    incomes: db.collection("Income"),
    transactions: db.collection("Transaction"),
  };

  if (RESET_TRANSACTIONS) {
    logUpdate(" ⏳ Resetting transactions collection");
    try {
      await collections.transactions.deleteMany({});
      logUpdate(" ✅ Resetting transactions collection... Done");
    } catch (error) {
      logUpdate(" ✅ Resetting transactions collection... Already empty");
    }
    logUpdate.done();
  }

  logUpdate(" ⏳ Getting expenses...");
  const expenses = await collections.expenses.find({}).toArray();
  logUpdate(` ✅ Getting expenses... ${expenses.length} found`);
  logUpdate.done();

  logUpdate(" ⏳ Getting incomes...");
  const incomes = await collections.incomes.find({}).toArray();
  logUpdate(` ✅ Getting incomes... ${incomes.length} found`);
  logUpdate.done();

  if (!expenses.length && !incomes.length) {
    console.info(" ⛔️ Nothing to migrate");
    return;
  }

  logUpdate(" ⏳ Creating new transactions...");
  try {
    const data = [
      ...expenses.map((expense) => ({
        ...expense,
        type: CategoryType.Expense,
      })),
      ...incomes.map((income) => ({ ...income, type: CategoryType.Income })),
    ];
    const transactions = await collections.transactions.insertMany(data);
    logUpdate(
      ` ✅ Creating new transactions... ${transactions.insertedCount} created`
    );
  } catch (error) {
    logUpdate(" ‼️ Creating new transactions... already migrated");
  }
  logUpdate.done();
  console.info(" ✅ Done");
  console.info(
    " ** All incomes and expenses have been converted to transactions. **"
  );
  console.info(
    " ** Incomes and expenses are still in the database, but they are not used anymore. **"
  );
  console.info(" ** You can delete them if you want. **");
}

main()
  .then(() => {})
  .catch(console.error)
  .finally(() => {
    client.close();
  });
