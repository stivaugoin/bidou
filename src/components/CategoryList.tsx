import { Category } from "@prisma/client";
import { useState } from "react";
import { CategoryItem } from "./CategoryItem";
import { CategoryMenu } from "./CategoryMenu";
import { List } from "./List";

interface Props {
  categories: (Pick<Category, "id" | "name" | "parentId" | "type"> & {
    Children: Pick<Category, "id" | "name" | "parentId" | "type">[];
  })[];
}

export function CategoryList({ categories }: Props) {
  const [categoryEditIds, setCategoryEditIds] = useState<string[]>([]);

  function handleOpenEdit(transactionId: string) {
    setCategoryEditIds((ids) => [...ids, transactionId]);
  }

  function handleCloseEdit(transactionId: string) {
    setCategoryEditIds((ids) => ids.filter((id) => id !== transactionId));
  }

  const data = categories.reduce((acc, category) => {
    return [...acc, category, ...category.Children];
  }, [] as Pick<Category, "id" | "name" | "parentId" | "type">[]);

  return (
    <List
      data={data}
      renderItem={(category) => (
        <CategoryItem
          data={category}
          edit={categoryEditIds.includes(category.id)}
          onCloseEdit={() => handleCloseEdit(category.id)}
        />
      )}
      renderMenu={(category) => {
        if (categoryEditIds.includes(category.id)) return null;
        return (
          <CategoryMenu
            categoryId={category.id}
            onClickEdit={() => handleOpenEdit(category.id)}
          />
        );
      }}
    />
  );
}
