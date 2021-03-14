import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { CategoryId } from "../../../../api/categories";
import { NotFound } from "../../NotFound";
import { CategoriesEdit } from "./CategoriesEdit";
import { deleteCategory } from "/imports/api/categories/methods/delete";
import { useCategories } from "/imports/ui/hooks/useCategories";

export function CategoriesEditContainer(): JSX.Element {
  const history = useHistory();
  const { categoryId } = useParams<{ categoryId: CategoryId }>();

  const [category] = useCategories({ _id: categoryId });

  const handleClickDelete = () => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      deleteCategory.call(categoryId, (err) => {
        if (err) {
          window.alert(err.message);
        } else {
          history.replace("/categories");
        }
      });
    }
  };

  const handleReturnToList = () => {
    history.push("/categories");
  };

  if (!category) {
    return <NotFound />;
  }

  return (
    <CategoriesEdit
      category={category}
      onAfterSave={handleReturnToList}
      onClickCancel={handleReturnToList}
      onClickDelete={handleClickDelete}
    />
  );
}
