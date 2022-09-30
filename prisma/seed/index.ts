import { CategoryType } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import data from "./data";
import reset from "./reset";
import { getRandomDatesByMonth, randomNumber, randomValue } from "./utils";

const LOG = " => Seeding database...";

const today = new Date();

const EXPENSES_YEARS = [2020, 2021, 2022];
const INCOMES_YEARS = [2020, 2021, 2022];

// ==========================================================
// TODO: Improve performance and logic
// ==========================================================
async function main() {
  await reset(prisma);

  console.info(" => Seeding database...");

  // Categories
  const categories = await Promise.all(
    data.categories.map(async ({ id, name, type }) => {
      await prisma.category.upsert({
        where: { id },
        create: { id, name, type },
        update: { name, type },
      });
    })
  );

  // Providers
  const providers = await Promise.all(
    data.providers.map(async ({ id, Category, name }) => {
      await prisma.provider.upsert({
        where: { id },
        create: { id, Category, name },
        update: { Category, name },
      });
    })
  );

  // Expenses
  const expenses = await Promise.all(
    data.providers.map(async ({ id, expenses: { amount, countByMonth } }) => {
      const expenses = EXPENSES_YEARS.flatMap((year) => {
        // Get random dates for each month of the year
        return Array.from(Array(12).keys()).flatMap((month) => {
          const count = randomNumber(countByMonth[0], countByMonth[1]);

          return getRandomDatesByMonth(count, month, year)
            .filter((date) => date.valueOf() < today.valueOf())
            .map((date) => {
              return {
                amount: randomNumber(amount[0], amount[1]),
                date,
                Provider: { connect: { id } },
              };
            });
        });
      });

      expenses.map(async (data) => {
        await prisma.expense.create({ data });
      });
    })
  );

  // Incomes
  const incomes = await Promise.all(
    data.categories
      .filter((category) => category.type === CategoryType.Income)
      .map((category) => {
        const incomes = INCOMES_YEARS.flatMap((year) => {
          // Get random dates for each month of the year
          return Array.from(Array(12).keys()).flatMap((month) => {
            const count = randomNumber(1, 2);

            return getRandomDatesByMonth(count, month, year)
              .filter((date) => date.valueOf() < today.valueOf())
              .map((date) => {
                return {
                  amount: randomValue([100000, 150000, 200000, 250000, 300000]),
                  date,
                  Category: { connect: { id: category.id } },
                };
              });
          });
        });

        incomes.map(async (data) => {
          await prisma.income.create({ data });
        });
      })
  );

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
