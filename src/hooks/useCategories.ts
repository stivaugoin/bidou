import { CategoryType } from "@prisma/client";
import { useContext } from "react";
import { CategoriesContext } from "../contexts/CategoriesContext";

export type UseCategoriesProps = {
  filterCategory?: "all" | "children" | "root";
  type?: CategoryType;
};

export function useCategories(props?: UseCategoriesProps) {
  const categories = useContext(CategoriesContext);

  if (!categories)
    throw new Error(
      "useCategories must be used within a CategoriesContextProvider"
    );

  let newCategories = [...categories];

  if (props?.type) {
    newCategories = newCategories.filter(
      (category) => category.type === props.type
    );
  }

  switch (props?.filterCategory) {
    case "all":
      break;
    case "children":
      newCategories = newCategories.filter(
        (category) =>
          Boolean(category.parentId) || category.Children.length === 0
      );
      break;
    case "root":
      newCategories = newCategories.filter((category) => !category.parentId);
      break;
  }

  return newCategories;
}
