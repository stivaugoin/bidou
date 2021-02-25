import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import {
  CategoriesCollection,
  CategoryId,
  ICategory,
} from "../../../../api/categories";
import { deleteCategory } from "../../../../api/categories/methods/delete";
import { CategoriesList } from "./CategoriesList";

export function CategoriesListContainer(): JSX.Element {
  const { categories } = useTracker(() => {
    const categories: Array<
      Pick<ICategory, "_id" | "name" | "type">
    > = CategoriesCollection.find(
      {},
      {
        fields: { _id: 1, name: 1, type: 1 },
        sort: { type: 1, name: 1 },
      }
    ).fetch();

    return {
      categories,
    };
  }, []);

  const handleDelete = (categoryId: CategoryId) => {
    deleteCategory.call(categoryId, () => {
      console.log(`${categoryId} deleted!`);
    });
  };

  return <CategoriesList categories={categories} onDelete={handleDelete} />;
}
