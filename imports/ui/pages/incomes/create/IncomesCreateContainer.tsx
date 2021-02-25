import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import { useHistory } from "react-router-dom";
import { CategoriesCollection } from "../../../../api/categories";
import { IncomesCreate } from "./IncomesCreate";

export function IncomesCreateContainer(): JSX.Element {
  const history = useHistory();

  const { categories } = useTracker(() => {
    return {
      categories: CategoriesCollection.find(
        { type: "income" },
        { fields: { _id: 1, name: 1 } }
      ).fetch(),
    };
  }, []);

  const handleClickCancel = () => {
    history.goBack();
  };

  const handleAfterCreate = () => {
    history.replace("/incomes");
  };

  return (
    <IncomesCreate
      categories={categories}
      onAfterCreate={handleAfterCreate}
      onClickCancel={handleClickCancel}
    />
  );
}
