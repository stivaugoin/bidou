import React from "react";
import { Hello } from "./Hello";
import { Info } from "./Info";

export const App = (): JSX.Element => (
  <div>
    <h1>Welcome to Meteor!</h1>
    <Hello />
    <Info />
  </div>
);
