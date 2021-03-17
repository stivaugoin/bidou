import React from "react";
import renderer from "react-test-renderer";
import { Card } from "../Card";

test("Card", () => {
  const component = renderer.create(<Card>children</Card>);
  expect(component.toJSON()).toMatchSnapshot();
});
