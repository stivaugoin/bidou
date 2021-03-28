import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ExpensesCreate } from "./ExpensesCreate";
import { ExpensesEdit } from "./ExpensesEdit";
import { ExpensesList } from "./ExpensesList";

export function Expenses(): JSX.Element {
  return (
    <Switch>
      <Route exact path="/expenses/create">
        <ExpensesCreate />
      </Route>

      <Route exact path="/expenses/:expenseId">
        <ExpensesEdit />
      </Route>

      <Route exact path="/expenses">
        <ExpensesList />
      </Route>

      <Redirect to="/expenses" />
    </Switch>
  );
}
