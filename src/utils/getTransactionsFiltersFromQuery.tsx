import { CategoryType } from "@prisma/client";
import { ParsedUrlQuery } from "querystring";
import { Filters } from "../hooks/useTransactionsFilters";

export function getTransactionsFiltersFromQuery(
  query: ParsedUrlQuery
): Filters {
  const { categoryId, type } = query;

  return {
    categoryId: (categoryId as string) || "",
    type: (type as CategoryType) || "",
  };
}
