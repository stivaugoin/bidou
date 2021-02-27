import React from "react";
import { useHistory } from "react-router-dom";
import { ExpensesCreate } from "./ExpensesCreate";
import { useCategories } from "/imports/ui/hooks/useCategories";

export function ExpensesCreateContainer(): JSX.Element {
  const history = useHistory();
  const categories = useCategories({ type: "expense" });

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
