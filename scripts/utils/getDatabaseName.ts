export function getDatabaseName(DATABASE_URL: string) {
  return DATABASE_URL.split("/").at(-1)?.split("?").at(0);
}
