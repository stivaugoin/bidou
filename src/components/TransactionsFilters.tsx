import { SegmentedControl, SimpleGrid } from "@mantine/core";
import { CategoryType } from "@prisma/client";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import { SelectCategory } from "./SelectCategory";

type Filters = { categoryId?: string; type?: CategoryType | "" };

export function TransactionsFilters() {
  const { pathname, push, query } = useRouter();
  const { categoryId, type } = getFilters(query);

  const [filters, setFilters] = useState<Filters>({ categoryId, type });

  useEffect(() => {
    if (filters.categoryId !== categoryId) {
      setFilters({ ...filters, categoryId });
    }
    if (filters.type !== type) {
      setFilters({ ...filters, type });
    }
  }, [categoryId, filters, pathname, query, type]);

  function handleChangeCategory(value: string | null) {
    setFilters({ ...filters, categoryId: value || "" });

    if (value === null) {
      const { categoryId, ...rest } = query;
      push({ pathname, query: rest });
    } else {
      push({ pathname, query: { ...query, categoryId: value } });
    }
  }

  function handleChangeType(value: CategoryType | "") {
    setFilters({ ...filters, categoryId: "", type: value });

    const { categoryId, ...rest } = query;
    if (value === "") {
      delete rest.type;
      push({ pathname, query: rest });
    } else {
      push({ pathname, query: { ...rest, type: value } });
    }
  }

  return (
    <SimpleGrid
      breakpoints={[{ cols: 1, maxWidth: "md" }, { cols: 2 }]}
      sx={{ alignItems: "center" }}
    >
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

function getFilters(query: ParsedUrlQuery): Filters {
  const { categoryId, type } = query;

  return {
    categoryId: (categoryId as string) || "",
    type: (type as CategoryType) || "",
  };
}
