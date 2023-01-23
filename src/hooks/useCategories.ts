import { CategoryType } from "@prisma/client";
import { useContext } from "react";
import { CategoriesContext } from "../contexts/CategoriesContext";

export type UseCategoriesProps = { type?: CategoryType } & (
  | { childrenOnly?: never; rootOnly?: boolean }
  | { childrenOnly?: boolean; rootOnly?: never }
);

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

  if (props && "childrenOnly" in props && props.childrenOnly) {
    newCategories = newCategories.filter(
      (category) => Boolean(category.parentId) || category.Children.length === 0
    );
  }

  if (props && "rootOnly" in props && props.rootOnly) {
    newCategories = newCategories.filter((category) => !category.parentId);
  }

  return newCategories;
}
