import { config } from "dotenv";
import logUpdate from "log-update";
import { MongoClient } from "mongodb";
import { getDatabaseName } from "./utils/getDatabaseName";

config();

(async function dropDatabase() {
  let client;

  try {
    const { DATABASE_URL } = process.env;

    if (!DATABASE_URL) throw new Error("DATABASE_URL is not defined");

    logUpdate("🔌 Connecting to database...");
    client = new MongoClient(DATABASE_URL);
    await client.connect();
    logUpdate("⚡️ Connected to database");
    logUpdate.done();

    const dbName = getDatabaseName(DATABASE_URL);
    const db = client.db(dbName);

    const collections = await db.collections();

    if (!collections.length) {
      logUpdate("❌ Database is empty");
      logUpdate.done();
      return;
    }

    for (const collection of collections) {
      logUpdate(`⏳ Dropping collection ${collection.collectionName}...`);
      await collection.drop();
      logUpdate(`✅ Collection ${collection.collectionName} dropped`);
      logUpdate.done();
    }

    logUpdate("✅ Database dropped");
    logUpdate.done();
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await client?.close();
  }
})();
