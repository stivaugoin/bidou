import { Stack, Title } from "@mantine/core";
import { CategoryType } from "@prisma/client";
import { useCategories } from "../hooks/useCategories";
import { CategoriesItem } from "./CategoriesItem";

export function CategoryList() {
  const categories = useCategories();

  const incomes = categories.filter(
    (category) => category.type === CategoryType.Income && !category.parentId
  );
  const expenses = categories.filter(
    (category) => category.type === CategoryType.Expense && !category.parentId
  );

  return (
    <>
      <Stack spacing={0} mt="xl">
        <Title mb="md" order={3}>
          Incomes
        </Title>
        <CategoriesItem categories={incomes} />
      </Stack>

      <Stack spacing={0} mt="xl">
        <Title mb="md" order={3}>
          Expenses
        </Title>
        <CategoriesItem categories={expenses} />
      </Stack>
    </>
  );
}
