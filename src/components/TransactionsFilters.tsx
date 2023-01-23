import { SegmentedControl, SimpleGrid } from "@mantine/core";
import { CategoryType } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";

export function TransactionsFilters() {
  const router = useRouter();
  const categoryType = router.query.type as CategoryType;

  const [type, setType] = useState<CategoryType | "">(categoryType || "");

  function handleChangeType(value: CategoryType | "") {
    setType(value);
    const pathname = router.pathname;

    if (value === "") {
      const { type, ...query } = router.query;
      router.push({ pathname, query });
    } else {
      router.push({ pathname, query: { ...router.query, type: value } });
    }
  }

  return (
    <SimpleGrid cols={2}>
      <SegmentedControl
        data={[
          { label: "All", value: "" },
          { label: "Incomes", value: CategoryType.Income },
          { label: "Expenses", value: CategoryType.Expense },
        ]}
        onChange={handleChangeType}
        radius="md"
        value={type}
      />
    </SimpleGrid>
  );
}
