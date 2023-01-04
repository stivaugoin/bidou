import dayjs from "dayjs";
import { procedure, router } from ".";
import { MONTH_YEAR } from "../../utils/constant";
import { getIncomeCategories } from "../../utils/getIncomeCategories";
import { getIncomeTotalByCategory } from "../../utils/getIncomeTotalByCategory";
import { getLastThreeMonths } from "../../utils/getLastThreeMonths";

export const dashboardRouter = router({
  compareIncomes: procedure.query(async ({ ctx }) => {
    const categories = await getIncomeCategories(ctx.prisma);
    const totalByCategory = await getIncomeTotalByCategory(ctx.prisma, {
      categoryIds: categories.map((c) => c.id),
    });

    const transactions = await ctx.prisma.transaction.findMany({
      orderBy: { date: "desc" },
      where: {
        date: { gte: dayjs().subtract(2, "month").startOf("month").toDate() },
        categoryId: { in: categories.map((c) => c.id) },
      },
    });

    return categories.map((category) => {
      const months = getLastThreeMonths().map((month) => {
        const amount = transactions
          .filter((income) => {
            return (
              income.categoryId === category.id &&
              dayjs(income.date).format(MONTH_YEAR) === month
            );
          })
          .reduce((acc, transaction) => acc + transaction.amount, 0);

        return { amount, title: month };
      });

      const currentTotal = totalByCategory[category.id] || 0;
      const otherTotal = Object.entries(totalByCategory)
        .filter(([categoryId]) => categoryId !== category.id)
        .reduce((acc, [, amount]) => acc + amount, 0);

      return {
        difference: currentTotal - otherTotal,
        id: category.id,
        title: category.name,
        months,
      };
    });
  }),
});
