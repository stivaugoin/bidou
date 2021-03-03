import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import { useHistory } from "react-router-dom";
import { IncomesCreate } from "./IncomesCreate";
import { useCategories } from "/imports/ui/hooks/useCategories";

export function IncomesCreateContainer(): JSX.Element {
  const history = useHistory();

  const categories = useCategories(
    { type: "income" },
    { fields: { _id: 1, defaultUserId: 1, name: 1, type: 1 } }
  );

  const currentUserId = useTracker(() => Meteor.userId());

  const defaultCategoryId =
    categories.find(({ defaultUserId }) => defaultUserId === currentUserId)
      ?._id ?? "";

  const handleClickCancel = () => {
    history.goBack();
  };

  const handleAfterCreate = () => {
    history.replace("/incomes");
  };

  return (
    <IncomesCreate
      categories={categories}
      defaultCategoryId={defaultCategoryId}
      onAfterCreate={handleAfterCreate}
      onClickCancel={handleClickCancel}
    />
  );
}
