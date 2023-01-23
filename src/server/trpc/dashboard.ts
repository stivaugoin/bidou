import dayjs from "dayjs";
import { z } from "zod";
import { procedure, router } from ".";
import { MONTH_YEAR } from "../../utils/constant";
import { getIncomeTotalByCategory } from "../../utils/getIncomeTotalByCategory";
import { getLastThreeMonths } from "../../utils/getLastThreeMonths";

export const dashboardRouter = router({
  incomesLastThreeMonths: router({
    getData: procedure.query(async ({ ctx }) => {
      const settings =
        await ctx.prisma.dashboardIncomesLastThreeIncomes.findFirst();
      if (!settings || !settings.active) return null;

      const categoryIds = [];
      if (settings.categoryIdOne) categoryIds.push(settings.categoryIdOne);
      if (settings.categoryIdTwo) categoryIds.push(settings.categoryIdTwo);

      if (categoryIds.length === 0) return null;

      const totalByCategory = await getIncomeTotalByCategory(ctx.prisma, {
        categoryIds,
      });

      const transactions = await ctx.prisma.transaction.findMany({
        orderBy: { date: "desc" },
        where: {
          date: { gte: dayjs().subtract(2, "month").startOf("month").toDate() },
          categoryId: { in: categoryIds },
        },
      });

      const categories = await ctx.prisma.category.findMany({
        where: { id: { in: categoryIds } },
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

        if (!settings.displayDifference) {
          return { id: category.id, title: category.name, months };
        }

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

    getSettings: procedure.query(async ({ ctx }) => {
      const settings =
        await ctx.prisma.dashboardIncomesLastThreeIncomes.findFirst();

      if (!settings) {
        return {
          active: false,
          categoryIdOne: null,
          categoryIdTwo: null,
          displayDifference: null,
        };
      }

      return settings;
    }),

    setSettings: procedure
      .input(
        z.object({
          active: z.boolean(),
          categoryIdOne: z.string().nullable(),
          categoryIdTwo: z.string().nullable(),
          displayDifference: z.boolean().nullable(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const settings =
          await ctx.prisma.dashboardIncomesLastThreeIncomes.findFirst();

        const data = (() => {
          if (input.active && (!input.categoryIdOne || !input.categoryIdTwo)) {
            return {
              ...input,
              displayDifference: null,
            };
          }

          if (!input.active)
            return {
              active: false,
              categoryIdOne: null,
              categoryIdTwo: null,
              displayDifference: null,
            };

          return input;
        })();

        if (settings) {
          return ctx.prisma.dashboardIncomesLastThreeIncomes.update({
            where: { id: settings.id },
            data,
          });
        }

        return ctx.prisma.dashboardIncomesLastThreeIncomes.create({
          data,
        });
      }),
  }),
});
