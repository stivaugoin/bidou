import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { CategoriesCollection, CategoryId } from "../../../../api/categories";
import { NotFound } from "../../NotFound";
import { CategoriesEdit } from "./CategoriesEdit";

export function CategoriesEditContainer(): JSX.Element {
  const history = useHistory();
  const params = useParams<{ categoryId: CategoryId }>();
  const { categoryId } = params;

  const { category } = useTracker(() => {
    return {
      category: CategoriesCollection.findOne(categoryId),
    };
  }, [categoryId]);

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
