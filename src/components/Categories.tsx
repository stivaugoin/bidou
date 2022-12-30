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
    <Stack spacing="xl">
      <Stack>
        <Title order={3}>Incomes</Title>
        <CategoryList categories={incomes} />
      </Stack>

      <Stack>
        <Title order={3}>Expenses</Title>
        <CategoryList categories={expenses} />
      </Stack>
    </Stack>
  );
}
