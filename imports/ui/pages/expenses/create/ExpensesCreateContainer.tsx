import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import { useHistory } from "react-router-dom";
import { CategoriesCollection } from "../../../../api/categories";
import { ExpensesCreate } from "./ExpensesCreate";

export function ExpensesCreateContainer(): JSX.Element {
  const history = useHistory();

  const { categories } = useTracker(() => {
    return {
      categories: CategoriesCollection.find(
        { type: "expense" },
        { fields: { _id: 1, name: 1 } }
      ).fetch(),
    };
  }, []);

  const handleClickCancel = () => {
    history.goBack();
  };

  const handleAfterCreate = () => {
    history.replace("/expenses");
  };

  return (
    <ExpensesCreate
      categories={categories}
      onAfterCreate={handleAfterCreate}
      onClickCancel={handleClickCancel}
    />
  );
}
