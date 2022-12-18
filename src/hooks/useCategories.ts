import { CategoryType } from "@prisma/client";
import { useContext } from "react";
import { CategoriesContext } from "../contexts/CategoriesContext";

export function useCategories(props?: { type: CategoryType }) {
  const categories = useContext(CategoriesContext);

  if (!categories)
    throw new Error(
      "useCategories must be used within a CategoriesContextProvider"
    );

  if (props?.type) {
    return categories?.filter((category) => category.type === props.type);
  }

  return categories;
}
