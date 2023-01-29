import { readdirSync } from "fs";
import path from "path";

interface Props {
  lastMigration?: string;
}

type Output = {
  path: string;
  version: string;
}[];

export function getMigrationFiles({ lastMigration = "0.0.0" }: Props): Output {
  const migrationsDir = path.join(__dirname, "..", "migrations");
  const files = readdirSync(migrationsDir);

  return files.reduce((acc: Output, file) => {
    const semver = file.replace(".ts", "").replaceAll("_", ".");
    const fileVersion = semverToNumber(semver);

    if (!fileVersion) return acc;

    const lastMigrationVersion = semverToNumber(lastMigration) || 0;

    if (!file.endsWith(".ts")) return acc;
    if (file === "index.ts") return acc;
    if (fileVersion <= lastMigrationVersion) return acc;

    return [
      ...acc,
      {
        path: path.join(migrationsDir, file),
        version: semver,
      },
    ];
  }, []);
}

function semverToNumber(version: string): number {
  return parseInt(version.split(".").join(""), 10);
}
