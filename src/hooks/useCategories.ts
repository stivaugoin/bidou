import { CategoryType } from "@prisma/client";
import { useContext } from "react";
import { CategoriesContext } from "../contexts/CategoriesContext";

interface Props {
  rootOnly?: boolean;
  type?: CategoryType;
}

export function useCategories(props?: Props) {
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

  if (props?.rootOnly) {
    newCategories = newCategories.filter((category) => !category.parentId);
  }

  return newCategories;
}
