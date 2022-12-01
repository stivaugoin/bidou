const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const { Type } = require("@prisma/client");

dotenv.config();

const {
  DATABASE_NAME,
  DATABASE_PRODUCTION_URL,
  RESET_TRANSACTIONS = false,
} = process.env;

if (!DATABASE_NAME || !DATABASE_PRODUCTION_URL) {
  throw new Error("Missing environment variables");
}

console.info(" == Migrating database to v3.6.0 ==");
console.info(" -> Converting incomes and expenses to transactions");
console.info("");

// Connection URL
const client = new MongoClient(DATABASE_PRODUCTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function main() {
  await client.connect();
  console.info(" > Connected successfully to server");

  const db = client.db(DATABASE_NAME);

  const collections = {
    expenses: db.collection("Expense"),
    incomes: db.collection("Income"),
    transactions: db.collection("Transaction"),
  };

  if (RESET_TRANSACTIONS) {
    console.info(" > Resetting transactions collection...");
    try {
      await collections.transactions.deleteMany({});
      console.info(" > Resetting transactions collection... Done");
    } catch (error) {
      console.error(" > Resetting transactions collection... Already empty");
    }
  }

  console.info(" > Getting all expenses");
  const expenses = await collections.expenses.find({}).toArray();
  console.info(` > Getting all expenses... ${expenses.length} found`);

  console.info(" > Getting all incomes");
  const incomes = await collections.incomes.find({}).toArray();
  console.info(` > Getting all incomes... ${incomes.length} found`);

  console.info(" > Creating new transactions");
  try {
    const data = [
      ...expenses.map((expense) => ({ ...expense, type: Type.Expense })),
      ...incomes.map((income) => ({ ...income, type: Type.Income })),
    ];
    const transactions = await collections.transactions.insertMany(data);
    console.info(
      ` > Creating new transactions... ${transactions.insertedCount} created`
    );
  } catch (error) {
    console.error(" ERROR: Transactions already migrated");
  }
}

main()
  .then(() => {
    console.info(" > Done");
    console.info(
      " ** All incomes and expenses have been converted to transactions. **"
    );
    console.info(
      " ** Incomes and expenses are still in the database, but they are not used anymore. **"
    );
    console.info(" ** You can delete them if you want. **");
  })
  .catch(console.error)
  .finally(() => {
    client.close();
  });
