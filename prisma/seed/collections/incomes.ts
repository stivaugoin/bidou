import { CategoryType, PrismaClient } from "@prisma/client";
import data from "../data";
import {
  dateIsPast,
  getRandomDatesByMonth,
  randomNumber,
  randomValue,
} from "../utils";

const YEARS = [2020, 2021, 2022];

export default async function seedIncomes(prisma: PrismaClient) {
  console.info(" => Seeding incomes...");

  const incomeCategories = data.categories.filter(
    ({ type }) => type === CategoryType.Income
  );
  for await (const category of incomeCategories) {
    const incomes = YEARS.flatMap((year) => {
      // Get random dates for each month of the year
      return Array.from(Array(12).keys()).flatMap((month) => {
        const count = randomNumber(1, 2);

        return getRandomDatesByMonth(count, month, year)
          .filter(dateIsPast)
          .map(mapIncome(category));
      });
    });

    await prisma.income.createMany({ data: incomes });
  }

  console.info(" => Seeding incomes... [DONE]");
}

function mapIncome(category: typeof data.categories[number]) {
  return (date: Date) => {
    return {
      amount: randomValue([100000, 150000, 200000, 250000, 300000]),
      categoryId: category.id,
      date,
    };
  };
}
