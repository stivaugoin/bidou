import React, { useState } from "react";
import { Button } from "../components/Button/Button";

export function Login(): JSX.Element {
  const [error, setError] = useState<string | null>();

  const handleClickLoginWithGoogle = () => {
    setError(null);

    Meteor.loginWithGoogle({}, (error) => {
      if (error) {
        setError(error.message);
      }
    });
  };

  return (
    <div>
      <Button onClick={handleClickLoginWithGoogle} variant="primary">
        Login with Google
      </Button>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
