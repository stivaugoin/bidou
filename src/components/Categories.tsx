import { Stack, Title } from "@mantine/core";
import { CategoryType } from "@prisma/client";
import { useCategories } from "../hooks/useCategories";
import { CategoryList } from "./CategoryList";

export function Categories() {
  const incomes = useCategories({
    rootOnly: true,
    type: CategoryType.Income,
  });

  const expenses = useCategories({
    rootOnly: true,
    type: CategoryType.Expense,
  });

  return (
    <>
      <Stack spacing={0} mt="xl">
        <Title mb="md" order={3}>
          Incomes
        </Title>
        <CategoryList categories={incomes} />
      </Stack>

      <Stack spacing={0} mt="xl">
        <Title mb="md" order={3}>
          Expenses
        </Title>
        <CategoryList categories={expenses} />
      </Stack>
    </>
  );
}
