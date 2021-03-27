import { useTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading";

export function Login(): JSX.Element {
  const [error, setError] = useState<string | null>();

  const isLoggingIn = useTracker(() => {
    return Meteor.loggingIn();
  }, []);

  const handleClickLoginWithGoogle = () => {
    setError(null);

    Meteor.loginWithGoogle({}, (error) => {
      if (error) {
        setError(error.message);
      }
    });
  };

  if (isLoggingIn) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>Login - Bidou</title>
      </Helmet>

      <div className="h-full flex flex-col items-center justify-center bg-gray-50 space-y-16">
        <img className="h-12 w-auto" src="/images/logo-black.png" />

        <div className="flex flex-col space-y-4">
          <Button onClick={handleClickLoginWithGoogle} variant="secondary">
            Login with Google
          </Button>

          {error && <p className="text-red-500 text-center text-xs">{error}</p>}
        </div>
      </div>
    </>
  );
}
