import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Loading } from "./components/Loading/Loading";
import { useCurrentUser } from "./hooks/useCurrentUser";
import { useMinimalTimeLoading } from "./hooks/useMinimalTimeLoading";
import { Authenticated } from "./layouts/Authenticated";
import { Unauthenticated } from "./layouts/Unauthenticated";

export const App = (): JSX.Element => {
  const currentUser = useCurrentUser();
  const [isLoading] = useMinimalTimeLoading();

  if (Meteor.loggingIn() || isLoading) {
    return <Loading />;
  }

  return (
    <Router>{currentUser ? <Authenticated /> : <Unauthenticated />}</Router>
  );
};
