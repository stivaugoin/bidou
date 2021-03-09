import React from "react";
import { CategoriesList } from "./CategoriesList";
import { useCategories } from "/imports/ui/hooks/useCategories";

export function CategoriesListContainer(): JSX.Element {
  const categories = useCategories(
    {},
    {
      fields: { _id: 1, name: 1, type: 1 },
      sort: { type: 1, name: 1 },
    }
  );

  return <CategoriesList categories={categories} />;
}
