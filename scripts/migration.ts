import logUpdate from "log-update";
import { prisma } from "../src/lib/prisma";
import { getMigrationFiles } from "./utils/getMigrationFiles";
import { startMigrationLogs } from "./utils/startMigrationLogs";

async function main() {
  console.info("==========================================================");
  console.info("=          Welcome to the Bidou Migrations CLI 🚀        =");
  console.info("==========================================================");

  const lastMigration = await prisma.migration.findFirst({
    orderBy: { version: "desc" },
  });
  console.info("💾  Last migration:", lastMigration?.version || "none");

  const files = getMigrationFiles({ lastMigration: lastMigration?.version });
  if (files.length === 0) {
    console.info("🎉  No migration to run");
    return;
  }

  console.info(
    "🔎  Migrations found:",
    files.length,
    `(${files.map((f) => f.version).join(", ")})`
  );

  for (const file of files) {
    const { error, log, stop } = startMigrationLogs({ version: file.version });

    try {
      const migration = await import(file.path);
      await migration.default({ log, prisma });
      await prisma.migration.create({ data: { version: file.version } });

      stop();
      logUpdate.done();
    } catch (e) {
      error(e);
      process.exit(1);
    }
  }

  console.info("🎉  All migrations have been run");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
