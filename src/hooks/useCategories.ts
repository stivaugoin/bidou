import { CategoryType } from "@prisma/client";
import useSWR from "swr";
import { ApiGetCategories } from "../server/categories";

type ReturnError = [undefined, false, Error];
type ReturnLoading = [undefined, true, undefined];
type ReturnData = [ApiGetCategories, false, undefined];

export default function useCategories(
  type?: CategoryType
): ReturnError | ReturnLoading | ReturnData {
  const { data, error } = useSWR<ApiGetCategories>(["/api/categories", type]);

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
