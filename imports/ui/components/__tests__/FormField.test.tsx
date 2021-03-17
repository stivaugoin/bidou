import React from "react";
import renderer from "react-test-renderer";
import { FormField } from "../FormField";

test("FormField - basic", () => {
  const component = renderer.create(
    <FormField id="id" label="label">
      children
    </FormField>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test("FormField - error", () => {
  const component = renderer.create(
    <FormField error="error" id="id" label="label">
      children
    </FormField>
  );
  expect(component.toJSON()).toMatchSnapshot();
});
