import React, { useState } from "react";

export function Login(): JSX.Element {
  const [error, setError] = useState<string | undefined>();

  const handleClickLoginWithGoogle = () => {
    Meteor.loginWithGoogle({}, (error) => {
      if (error) {
        setError(error.message);
      }
    });
  };

  return (
    <div>
      <button onClick={handleClickLoginWithGoogle}>Login with Google</button>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
