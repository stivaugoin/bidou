import React from "react";
import { useHistory } from "react-router-dom";
import { IncomesCreate } from "./IncomesCreate";
import { useCategories } from "/imports/ui/hooks/useCategories";

export function IncomesCreateContainer(): JSX.Element {
  const history = useHistory();

  const categories = useCategories({ type: "income" });

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
