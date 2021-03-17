import React from "react";
import renderer from "react-test-renderer";
import { IconArrowRight } from "../ArrowRight";
import { IconTrash } from "../Trash";

test("Icon - ArrowRight", () => {
  const component = renderer.create(<IconArrowRight className="h-4 w-4" />);
  expect(component.toJSON()).toMatchSnapshot();
});

test("Icon - Trash", () => {
  const component = renderer.create(<IconTrash className="h-4 w-4" />);
  expect(component.toJSON()).toMatchSnapshot();
});
