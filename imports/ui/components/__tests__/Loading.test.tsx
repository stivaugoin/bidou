import React from "react";
import renderer from "react-test-renderer";
import { Loading } from "../Loading";

test("Loading", () => {
  const component = renderer.create(<Loading />);
  expect(component.toJSON()).toMatchSnapshot();
});
