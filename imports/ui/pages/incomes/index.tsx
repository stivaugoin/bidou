import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { IncomesCreate } from "./IncomesCreate";
import { IncomesEdit } from "./IncomesEdit";
import { IncomesList } from "./IncomesList";

export function Incomes(): JSX.Element {
  return (
    <Switch>
      <Route exact path="/incomes/create">
        <IncomesCreate />
      </Route>

      <Route exact path="/incomes/:incomeId">
        <IncomesEdit />
      </Route>

      <Route exact path="/incomes">
        <IncomesList />
      </Route>

      <Redirect to="/incomes" />
    </Switch>
  );
}
