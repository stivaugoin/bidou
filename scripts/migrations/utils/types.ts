import { PrismaClient } from "@prisma/client";

export interface MigrationOptions {
  log: (message: string) => void;
  prisma: PrismaClient;
}
