import { SegmentedControl, SimpleGrid } from "@mantine/core";
import { CategoryType } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";

export function TransactionsFilters() {
  const router = useRouter();
  const [type, setType] = useState<CategoryType | "">(
    (router.query.type as CategoryType) || ""
  );

  function handleChangeType(value: CategoryType | "") {
    setType(value);

    const routerQuery = { ...router.query };

    if (value === "") {
      delete routerQuery.type;
    } else {
      routerQuery.type = value;
    }

    router.push({
      pathname: router.pathname,
      query: routerQuery,
    });
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
