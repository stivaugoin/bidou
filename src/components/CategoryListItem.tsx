import { Box } from "@mantine/core";
import { inferRouterOutputs } from "@trpc/server";
import { useState } from "react";
import { trpc } from "../lib/trpc";
import { CategoriesRouter } from "../server/trpc/categories";
import { CategoryForm, OnSubmitParams } from "./CategoryForm";
import { CategoryListItemView } from "./CategoryListItemView";

interface Props {
  category: Optional<
    inferRouterOutputs<CategoriesRouter>["getAll"][number],
    "Children"
  >;
}

export function CategoryListItem({ category }: Props) {
  const [edit, setEdit] = useState(false);
  const mutation = trpc.categories.update.useMutation();

  const handleEdit = () => setEdit(true);
  const handleCancel = () => setEdit(false);
  const handleDelete = () => {};

  const handleSubmitForm = async (data: OnSubmitParams) => {
    await mutation.mutateAsync({ id: category.id, ...data });
    setEdit(false);
  };

  return (
    <Box key={category.id} p="md">
      {edit ? (
        <CategoryForm
          category={category}
          onCancel={handleCancel}
          onSubmit={handleSubmitForm}
        />
      ) : (
        <CategoryListItemView
          category={category}
          isSubcategory={category.parentId !== null}
          onClickEdit={handleEdit}
          onClickDelete={handleDelete}
        />
      )}
    </Box>
  );
}
