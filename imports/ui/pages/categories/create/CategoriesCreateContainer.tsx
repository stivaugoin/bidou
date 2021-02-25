import React from "react";
import { useHistory } from "react-router-dom";
import { CategoriesCreate } from "./CategoriesCreate";

export function CategoriesCreateContainer(): JSX.Element {
  const history = useHistory();

  const handleAfterCreate = () => {
    history.replace("/categories");
  };

  const handleClickCancel = () => {
    history.goBack();
  };

  return (
    <CategoriesCreate
      onAfterCreate={handleAfterCreate}
      onClickCancel={handleClickCancel}
    />
  );
}
