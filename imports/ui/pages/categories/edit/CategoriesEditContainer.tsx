import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { CategoryId } from "../../../../api/categories";
import { NotFound } from "../../NotFound";
import { CategoriesEdit } from "./CategoriesEdit";
import { useCategories } from "/imports/ui/hooks/useCategories";

export function CategoriesEditContainer(): JSX.Element {
  const history = useHistory();
  const params = useParams<{ categoryId: CategoryId }>();
  const { categoryId } = params;

  const [category] = useCategories({ _id: categoryId });

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
    />
  );
}
