import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { IncomesCreateContainer } from "./create/IncomesCreateContainer";
import { IncomesEditContainer } from "./edit/IncomesEditContainer";
import { IncomeListContainer } from "./list/IncomesListContainer";

export function Incomes(): JSX.Element {
  return (
    <Switch>
      <Route exact path="/incomes/create">
        <IncomesCreateContainer />
      </Route>

      <Route exact path="/incomes/:incomeId">
        <IncomesEditContainer />
      </Route>

      <Route exact path="/incomes">
        <IncomeListContainer />
      </Route>

      <Redirect to="/incomes" />
    </Switch>
  );
}
