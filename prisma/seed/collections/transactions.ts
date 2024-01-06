import { PrismaClient } from "@prisma/client";
import logUpdate from "log-update";
import data from "../data";
import {
  dateIsPast,
  getCategoriesWithTransactions,
  getRandomDatesByMonth,
  getYears,
  mapTransaction,
  randomNumber,
} from "../utils";

export default async function seedTransactions(prisma: PrismaClient) {
  logUpdate("🌱 Seeding transactions...");

  const years = getYears(3);
  const categories = getCategoriesWithTransactions(data.categories);

  for await (const category of categories) {
    const data = years.flatMap((year) => {
      return Array.from({ length: 12 }).flatMap((_, month) => {
        const [min, max] = category.transactions.countByMonth;
        const count = randomNumber(min, max);

        // Generation transactions for the month
        return getRandomDatesByMonth(count, month, year)
          .filter(dateIsPast)
          .map(mapTransaction(category));
      });
    });

    await prisma.transaction.createMany({ data });
  }

  logUpdate("✅ Transactions seeded");
  logUpdate.done();
}
