import { useContext } from "react";
import { CategoriesContext } from "../contexts/CategoriesContext";

export function useCategory(categoryId: string) {
  const categories = useContext(CategoriesContext);

  if (!categories) {
    throw new Error(
      "useCategory must be used within a CategoriesContextProvider"
    );
  }

  return categories?.find((category) => category.id === categoryId);
}
