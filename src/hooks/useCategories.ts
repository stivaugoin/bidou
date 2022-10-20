import { CategoryType } from "@prisma/client";
import useSWR from "swr";
import { ApiGetAllCategories } from "../pages/api/categories";

type ReturnError = [undefined, false, Error];
type ReturnLoading = [undefined, true, undefined];
type ReturnData = [ApiGetAllCategories, false, undefined];

export default function useCategories(
  type?: CategoryType
): ReturnError | ReturnLoading | ReturnData {
  const { data, error } = useSWR<ApiGetAllCategories>([
    "/api/categories",
    CategoryType.Income,
  ]);

  if (error) return [undefined, false, error];
  if (!data) return [undefined, true, undefined];

  const categories = data.filter((category) => {
    if (type === CategoryType.Income) {
      return category.type === CategoryType.Income;
    }

    if (type === CategoryType.Expense) {
      return category.type === CategoryType.Expense;
    }

    return true;
  });

  return [categories, false, undefined];
}
