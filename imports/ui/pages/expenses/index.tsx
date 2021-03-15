import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ExpensesCreateContainer } from "./create/ExpensesCreateContainer";
import { ExpensesEditContainer } from "./edit/ExpensesEditContainer";
import { ExpenseListContainer } from "./list/ExpensesListContainer";

export function Expenses(): JSX.Element {
  return (
    <Switch>
      <Route exact path="/expenses/create">
        <ExpensesCreateContainer />
      </Route>

      <Route exact path="/expenses/:expenseId">
        <ExpensesEditContainer />
      </Route>

      <Route exact path="/expenses">
        <ExpenseListContainer />
      </Route>

      <Redirect to="/expenses" />
    </Switch>
  );
}
