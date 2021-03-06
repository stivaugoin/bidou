import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

export function Logout(): JSX.Element {
  const history = useHistory();

  useEffect(() => {
    Meteor.logout();
    history.replace("/");
  }, [history]);

  return <p>Loading...</p>;
}
