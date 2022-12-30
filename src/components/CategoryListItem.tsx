import { Box } from "@mantine/core";
import { Category } from "@prisma/client";
import { useState } from "react";
import { trpc } from "../lib/trpc";
import { CategoryForm } from "./CategoryForm";
import { CategoryListItemView } from "./CategoryListItemView";

interface Props {
  category: Pick<Category, "id" | "name" | "parentId" | "type">;
}

export function CategoryListItem({ category }: Props) {
  const [edit, setEdit] = useState(false);
  const mutation = trpc.categories.update.useMutation();

  const handleEdit = () => setEdit(true);
  const handleCancel = () => setEdit(false);

  return (
    <Box key={category.id} p="md">
      {edit ? (
        <CategoryForm
          category={category}
          onCancel={handleCancel}
          onSubmit={async (data) => {
            await mutation.mutateAsync({ id: category.id, ...data });
            setEdit(false);
          }}
        />
      ) : (
        <CategoryListItemView
          category={category}
          isSubcategory={category.parentId !== null}
          onClickEdit={handleEdit}
        />
      )}
    </Box>
  );
}
