import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Login } from "../pages/Login";

export function Unauthenticated(): JSX.Element {
  console.log("Unauthenticated");
  return (
    <Switch>
      <Route exact path="/login">
        <Login />
      </Route>

      <Redirect to="/login" />
    </Switch>
  );
}
