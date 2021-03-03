import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../components/Button/Button";

export function NotFound(): JSX.Element {
  const history = useHistory();

  const handleClickBack = () => {
    history.goBack();
  };

  return (
    <div>
      <h1>Page not found</h1>
      <Button onClick={handleClickBack} variant="primary">
        Go back
      </Button>
    </div>
  );
}
