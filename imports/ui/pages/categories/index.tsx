import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CategoriesCreate } from "./CategoriesCreate";
import { CategoriesEdit } from "./CategoriesEdit";
import { CategoriesList } from "./CategoriesList";

export function Categories(): JSX.Element {
  return (
    <Switch>
      <Route exact path="/categories/create">
        <CategoriesCreate />
      </Route>

      <Route exact path="/categories/:categoryId">
        <CategoriesEdit />
      </Route>

      <Route exact path="/categories">
        <CategoriesList />
      </Route>

      <Redirect to="/categories" />
    </Switch>
  );
}
