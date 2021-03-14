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
    <div className="h-full flex flex-col items-center justify-center bg-gray-50 space-y-16">
      <img className="h-12 w-auto" src="/images/logo-login.png" />

      <div className="flex flex-col space-y-4">
        <Button onClick={handleClickLoginWithGoogle} variant="secondary">
          Login with Google
        </Button>

        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
    </div>
  );
}
