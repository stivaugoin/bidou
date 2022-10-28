const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const { CategoryType } = require("@prisma/client");

dotenv.config();

const { DATABASE_V2_PRODUCTION_URL, DATABASE_V3_PRODUCTION_URL } = process.env;

if (!DATABASE_V2_PRODUCTION_URL || !DATABASE_V3_PRODUCTION_URL) {
  throw new Error("Missing environment variables");
}

console.info(" == Migrating database to v3 ==");

// Connection URL
const clientV2 = new MongoClient(DATABASE_V2_PRODUCTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const clientV3 = new MongoClient(DATABASE_V3_PRODUCTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Database Name
const dbNameV2 = "meteor";
const dbNameV3 = "production";

async function main() {
  await clientV2.connect();
  console.info(" > Connected successfully to server v2");
  await clientV3.connect();
  console.info(" > Connected successfully to server v3");

  const dbV2 = clientV2.db(dbNameV2);
  const dbV3 = clientV3.db(dbNameV3);

  const oldCollections = {
    categories: dbV2.collection("categories"),
    incomes: dbV2.collection("incomes"),
  };

  const newCollections = {
    categories: dbV3.collection("Category"),
    incomes: dbV3.collection("Income"),
  };

  if (process.env.RESET_DB) {
    console.info(" > Dropping collections");
    try {
      await Promise.all(
        Object.values(newCollections).map((collection) => collection.drop())
      );
    } catch (e) {
      console.info(" > Collections already dropped");
    }
  }

  console.info(" > Getting all categories from v2...");
  const oldCategories = await oldCollections.categories
    .find({ type: "income" })
    .toArray();
  console.info(
    ` > Getting all categories from v2... ${oldCategories.length} found`
  );

  console.info(" > Inserting categories into v3...");
  await newCollections.categories.insertMany(
    oldCategories.map((category) => ({
      name: category.name,
      type: CategoryType.Income,
    }))
  );
  console.info(" > Inserting categories into v3... done");

  // Map old category id to new category id
  const newCategories = await newCollections.categories
    .find({}, { _id: 1 })
    .toArray();
  const oldToNewCategories = new Map(
    oldCategories.map((category, index) => [
      category._id,
      newCategories[index]._id,
    ])
  );

  console.info(" > Getting all incomes from v2...");
  const oldIncomes = await oldCollections.incomes.find().toArray();
  console.info(` > Getting all incomes from v2... ${oldIncomes.length} found`);

  console.info(" > Inserting incomes into v3...");
  await newCollections.incomes.insertMany(
    oldIncomes.map((income) => ({
      amount: income.amount,
      categoryId: oldToNewCategories.get(income.categoryId),
      date: income.date,
      note: income.comments,
    }))
  );
  console.info(" > Inserting incomes into v3... done");
}

main()
  .then(() => {
    console.info(" > Done");
  })
  .catch(console.error)
  .finally(() => {
    clientV2.close();
    clientV3.close();
  });
