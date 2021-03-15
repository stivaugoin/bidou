import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Loading } from "../components/Loading/Loading";
import { Navbar } from "../components/Navbar/Navbar";
import { useMinimalTimeLoading } from "../hooks/useMinimalTimeLoading";
import { Categories } from "../pages/categories";
import { DashboardContainer } from "../pages/dashboard/DashboardContainer";
import { Expenses } from "../pages/expenses";
import { Incomes } from "../pages/incomes";
import { Logout } from "../pages/Logout";

export function Authenticated(): JSX.Element {
  console.log("Authenticated");
  const [isMinimalLoading] = useMinimalTimeLoading();

  const isSubLoading = useTracker(() => {
    return [
      Meteor.subscribe("categories.all"),
      Meteor.subscribe("expenses.all"),
      Meteor.subscribe("incomes.all"),
    ].some((sub) => !sub.ready());
  }, []);

  console.log({ isSubLoading, isMinimalLoading });

  if (isSubLoading || isMinimalLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col h-full">
      <Navbar />

      <main className="bg-gray-100 flex-1">
        <Switch>
          <Route exact path="/">
            <DashboardContainer />
          </Route>

          <Route path="/categories">
            <Categories />
          </Route>

          <Route path="/expenses">
            <Expenses />
          </Route>

          <Route path="/incomes">
            <Incomes />
          </Route>

          <Route exact path="/logout">
            <Logout />
          </Route>

          <Redirect to="/" />
        </Switch>
      </main>
    </div>
  );
}
