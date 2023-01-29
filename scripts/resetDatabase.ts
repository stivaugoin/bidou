import { exec } from "child_process";
import { config } from "dotenv";
import logUpdate from "log-update";
import { MongoClient } from "mongodb";
import { getDatabaseName } from "./utils/getDatabaseName";

config();

async function resetDatabase() {
  try {
    const { DATABASE_URL } = process.env;

    if (!DATABASE_URL) throw new Error("DATABASE_URL is not defined");

    const client = new MongoClient(DATABASE_URL);
    await client.connect();

    const dbName = getDatabaseName(DATABASE_URL);
    const db = client.db(dbName);

    const collections = await db.collections();
    for (const collection of collections) {
      logUpdate(`⏳ Deleting collection ${collection.collectionName}...`);
      await collection.drop();
      logUpdate(`✅ Deleted collection ${collection.collectionName}`);
      logUpdate.done();
    }

    await client.close();

    logUpdate("⏳ Seeding database...");
    exec("pnpm prisma db seed");
    logUpdate("✅ Database seeded");
    logUpdate.done();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

resetDatabase();
