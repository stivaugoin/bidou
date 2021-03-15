import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CategoriesCreateContainer } from "./create/CategoriesCreateContainer";
import { CategoriesEditContainer } from "./edit/CategoriesEditContainer";
import { CategoriesListContainer } from "./list/CategoriesListContainer";

export function Categories(): JSX.Element {
  return (
    <Switch>
      <Route exact path="/categories/create">
        <CategoriesCreateContainer />
      </Route>

      <Route exact path="/categories/:categoryId">
        <CategoriesEditContainer />
      </Route>

      <Route exact path="/categories">
        <CategoriesListContainer />
      </Route>

      <Redirect to="/categories" />
    </Switch>
  );
}
