import { readdirSync } from "fs";
import path from "path";

export function migrationFiles({ lastMigration }: { lastMigration?: string }) {
  const migrationsDir = path.join(__dirname, "..");
  const files = readdirSync(migrationsDir);

  return files.reduce((acc, file) => {
    if (file.endsWith(".ts") && file !== "index.ts") {
      if (lastMigration) {
        if (file.replace(".ts", "").replace("_", ".") > lastMigration) {
          acc.push(path.join(migrationsDir, file));
        }
      } else {
        acc.push(path.join(migrationsDir, file));
      }
    }
    return acc;
  }, [] as string[]);
}
