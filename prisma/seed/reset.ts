import type { PrismaClient } from "@prisma/client";

export default async function reset(db: PrismaClient) {
  console.info(" => Resetting database...");

  const expenses = await db.expense.findMany();
  await Promise.all(
    expenses.map((expense) => db.expense.delete({ where: { id: expense.id } }))
  );

  const incomes = await db.income.findMany();
  await Promise.all(
    incomes.map((income) => db.income.delete({ where: { id: income.id } }))
  );

  const providers = await db.provider.findMany();
  await Promise.all(
    providers.map((provider) =>
      db.provider.delete({ where: { id: provider.id } })
    )
  );

  const categories = await db.category.findMany();
  await Promise.all(
    categories.map((category) =>
      db.category.delete({ where: { id: category.id } })
    )
  );
  
  console.info(" => Resetting database... [DONE]");
}
