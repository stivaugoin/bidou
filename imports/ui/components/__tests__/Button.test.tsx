import React from "react";
import renderer from "react-test-renderer";
import { Button } from "../Button";

test("Button - destructive", () => {
  const destructive = renderer.create(
    <Button variant="destructive">Destructive</Button>
  );
  expect(destructive.toJSON()).toMatchSnapshot();
});

test("Button - primary", () => {
  const primary = renderer.create(<Button variant="primary">Primary</Button>);
  expect(primary.toJSON()).toMatchSnapshot();
});

test("Button - secondary", () => {
  const secondary = renderer.create(
    <Button variant="secondary">Secondary</Button>
  );
  expect(secondary.toJSON()).toMatchSnapshot();
});
