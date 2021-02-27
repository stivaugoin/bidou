import React from "react";
import { CategoryId } from "../../../../api/categories";
import { deleteCategory } from "../../../../api/categories/methods/delete";
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

  const handleDelete = (categoryId: CategoryId) => {
    deleteCategory.call(categoryId, () => {
      console.log(`${categoryId} deleted!`);
    });
  };

  return <CategoriesList categories={categories} onDelete={handleDelete} />;
}
