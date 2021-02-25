import React from "react";
import { useHistory } from "react-router-dom";

export function NotFound(): JSX.Element {
  const history = useHistory();

  const handleClickBack = () => {
    history.goBack();
  };

  return (
    <div>
      <h1>Page not found</h1>
      <button onClick={handleClickBack}>Go back</button>
    </div>
  );
}
