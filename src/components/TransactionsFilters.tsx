import { SegmentedControl, SimpleGrid } from "@mantine/core";
import { CategoryType } from "@prisma/client";
import { useTransactionsFilters } from "../hooks/useTransactionsFilters";
import { SelectCategory } from "./SelectCategory";

export function TransactionsFilters() {
  const { filters, handleChangeCategory, handleChangeType } =
    useTransactionsFilters();

  return (
    <SimpleGrid cols={{ base: 1, md: 2 }} role="toolbar" ta="center">
      <SegmentedControl
        data={[
          { label: "All", value: "" },
          { label: "Incomes", value: CategoryType.Income },
          { label: "Expenses", value: CategoryType.Expense },
        ]}
        onChange={handleChangeType}
        radius="md"
        value={filters.type}
      />

      <SelectCategory
        clearable={false}
        filterCategory="all"
        labelNoValue="All categories"
        onChange={handleChangeCategory}
        radius="md"
        size="sm"
        type={filters.type as CategoryType | undefined}
        value={filters.categoryId}
      />
    </SimpleGrid>
  );
}
