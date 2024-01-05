import { CategoryType } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getTransactionsFiltersFromQuery } from "../utils/getTransactionsFiltersFromQuery";

export type Filters = { categoryId?: string; type?: CategoryType | "" };

type Return = {
  filters: Filters;
  handleChangeCategory: (value: string | null) => void;
  handleChangeType: (value: string | "") => void;
};

export function useTransactionsFilters(): Return {
  const { pathname, push, query } = useRouter();
  const { categoryId, type } = getTransactionsFiltersFromQuery(query);

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

    if (value === null || value === "") {
      const { categoryId, ...rest } = query;
      push({ pathname, query: rest });
    } else {
      push({ pathname, query: { ...query, categoryId: value } });
    }
  }

  function handleChangeType(value: string | "") {
    setFilters({ ...filters, categoryId: "", type: value as CategoryType });

    const { categoryId, ...rest } = query;
    if (value === "") {
      delete rest.type;
      push({ pathname, query: rest });
    } else {
      push({ pathname, query: { ...rest, type: value } });
    }
  }

  return { filters, handleChangeCategory, handleChangeType };
}
