import { config } from "dotenv";
import logUpdate from "log-update";
import { MongoClient } from "mongodb";
import { getDatabaseName } from "./utils/getDatabaseName";

config();

async function resetDatabase() {
  try {
    const { DATABASE_URL } = process.env;

    if (!DATABASE_URL) throw new Error("DATABASE_URL is not defined");

    logUpdate("⏳ Connecting to database...");
    const client = new MongoClient(DATABASE_URL);
    await client.connect();
    logUpdate("🔌 Connected to database");

    const dbName = getDatabaseName(DATABASE_URL);
    const db = client.db(dbName);

    const collections = await db.collections();
    for (const collection of collections) {
      logUpdate(`⏳ Deleting collection ${collection.collectionName}...`);
      await collection.drop();
      logUpdate(`✅ Deleted collection ${collection.collectionName}`);
      logUpdate.done();
    }

    console.info("✅ Database reset");
    await client.close();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

resetDatabase();
