import { CategoryType } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import data from "./data";
import reset from "./reset";
import {
  dateIsPast,
  getRandomDatesByMonth,
  mapExpense,
  mapIncome,
  randomNumber,
} from "./utils";

const LOG = " => Seeding database...";

export const today = new Date();

const EXPENSES_YEARS = [2020, 2021, 2022];
const INCOMES_YEARS = [2020, 2021, 2022];

async function main() {
  await reset(prisma);

  console.info(" => Seeding database...");

  // Categories
  for await (const category of data.categories) {
    const { id, name, type } = category;
    await prisma.category.upsert({
      where: { id },
      create: { id, name, type },
      update: { name, type },
    });
  }

  // Providers
  for await (const provider of data.providers) {
    const { id, Category, name } = provider;
    await prisma.provider.upsert({
      where: { id },
      create: { id, Category, name },
      update: { Category, name },
    });
  }

  // Expenses
  for await (const provider of data.providers) {
    const expenses = EXPENSES_YEARS.flatMap((year) => {
      // Get random dates for each month of the year
      return Array.from(Array(12).keys()).flatMap((month) => {
        const { countByMonth } = provider.expenses;
        const count = randomNumber(countByMonth[0], countByMonth[1]);

        return getRandomDatesByMonth(count, month, year)
          .filter(dateIsPast)
          .map(mapExpense(provider));
      });
    });

    for await (const expense of expenses) {
      await prisma.expense.create({ data: expense });
    }
  }

  // Incomes
  const incomeCategories = data.categories.filter(
    ({ type }) => type === CategoryType.Income
  );
  for await (const category of incomeCategories) {
    const incomes = INCOMES_YEARS.flatMap((year) => {
      // Get random dates for each month of the year
      return Array.from(Array(12).keys()).flatMap((month) => {
        const count = randomNumber(1, 2);

        return getRandomDatesByMonth(count, month, year)
          .filter(dateIsPast)
          .map(mapIncome(category));
      });
    });

    for await (const income of incomes) {
      await prisma.income.create({ data: income });
    }
  }

  console.info(" => Seeding database... [Done]");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
