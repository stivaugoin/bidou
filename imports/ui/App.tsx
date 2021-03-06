import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { CategoriesCreateContainer } from "./pages/categories/create/CategoriesCreateContainer";
import { CategoriesEditContainer } from "./pages/categories/edit/CategoriesEditContainer";
import { CategoriesListContainer } from "./pages/categories/list/CategoriesListContainer";
import { DashboardContainer } from "./pages/dashboard/DashboardContainer";
import { ExpensesCreateContainer } from "./pages/expenses/create/ExpensesCreateContainer";
import { ExpensesEditContainer } from "./pages/expenses/edit/ExpensesEditContainer";
import { ExpenseListContainer } from "./pages/expenses/list/ExpensesListContainer";
import { IncomesCreateContainer } from "./pages/incomes/create/IncomesCreateContainer";
import { IncomesEditContainer } from "./pages/incomes/edit/IncomesEditContainer";
import { IncomeListContainer } from "./pages/incomes/list/IncomesListContainer";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";

export const App = (): JSX.Element => {
  const { isLoading, user } = useTracker(() => {
    const isLoading = [
      Meteor.subscribe("categories.all"),
      Meteor.subscribe("expenses.all"),
      Meteor.subscribe("incomes.all"),
    ].some((sub) => !sub.ready());

    const user = Meteor.user();

    return { isLoading, user };
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <Router>
      <div>
        <Navbar />

        <main>
          <Switch>
            {/* Dashboard */}
            <Route exact path="/">
              <DashboardContainer />
            </Route>

            {/* Categories */}
            <Route exact path="/categories/create">
              <CategoriesCreateContainer />
            </Route>
            <Route exact path="/categories/:categoryId">
              <CategoriesEditContainer />
            </Route>
            <Route exact path="/categories">
              <CategoriesListContainer />
            </Route>

            {/* Expenses */}
            <Route exact path="/expenses/create">
              <ExpensesCreateContainer />
            </Route>
            <Route exact path="/expenses/:expenseId">
              <ExpensesEditContainer />
            </Route>
            <Route exact path="/expenses">
              <ExpenseListContainer />
            </Route>

            {/* Incomes */}
            <Route exact path="/incomes/create">
              <IncomesCreateContainer />
            </Route>
            <Route exact path="/incomes/:incomeId">
              <IncomesEditContainer />
            </Route>
            <Route exact path="/incomes">
              <IncomeListContainer />
            </Route>

            <Route path="/logout">
              <Logout />
            </Route>

            {/* Fallback */}
            <Redirect to="/" />
          </Switch>
        </main>
      </div>
    </Router>
  );
};
