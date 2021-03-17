import React from "react";
import renderer from "react-test-renderer";
import { Page } from "../Page";

test("Page", () => {
  const component = renderer.create(
    <Page header={{ title: "Page" }}>children</Page>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test("Page with actions", () => {
  const component = renderer.create(
    <Page header={{ actions: [<div key="action">action</div>], title: "Page" }}>
      children
    </Page>
  );
  expect(component.toJSON()).toMatchSnapshot();
});
