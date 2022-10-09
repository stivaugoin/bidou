import { CategoryType, PrismaClient } from "@prisma/client";
import data, { SeedCategory, SeedSubCategory } from "../data";
import { dateIsPast, getRandomDatesByMonth, randomNumber } from "../utils";

const YEARS = [2020, 2021, 2022];

export default async function seedExpenses(prisma: PrismaClient) {
  console.log(" => Seeding expenses...");
  const expenseCategories = getSubCategories(data.categories);
  for await (const category of expenseCategories) {
    const expenses = YEARS.flatMap((year) => {
      // Get random dates for each month of the year
      return Array.from(Array(12).keys()).flatMap((month) => {
        const { countByMonth } = category.expenses;
        const count = randomNumber(countByMonth[0], countByMonth[1]);

        return getRandomDatesByMonth(count, month, year)
          .filter(dateIsPast)
          .map(mapExpense(category));
      });
    });

    await prisma.expense.createMany({ data: expenses });
  }
  console.log(" => Seeding expenses... [DONE]");
}

function mapExpense(category: SeedSubCategory) {
  return (date: Date) => {
    return {
      amount: randomNumber(
        category.expenses.amount[0],
        category.expenses.amount[1]
      ),
      categoryId: category.id,
      date,
    };
  };
}

function getSubCategories(categories: SeedCategory[]) {
  return categories.flatMap((category) => {
    if (category.type === CategoryType.Expense && category.subCategories) {
      return category.subCategories;
    }
    return [];
  });
}
