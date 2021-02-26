import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { ICategory } from "../../../../api/categories";
import { createCategory } from "../../../../api/categories/methods/create";
import { Select } from "../../../components/Select/Select";
import { Input } from "/imports/ui/components/Input/Input";

type Props = {
  onAfterCreate: () => void;
  onClickCancel: () => void;
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  type: Yup.mixed().oneOf(["expense", "income"]).required("Required"),
});

export function CategoriesCreate({
  onAfterCreate,
  onClickCancel,
}: Props): JSX.Element {
  return (
    <Formik
      initialValues={{
        name: "",
        type: "",
      }}
      onSubmit={({ name, type }, { setSubmitting }) => {
        createCategory.call({ name, type: type as ICategory["type"] }, () => {
          setSubmitting(false);
          onAfterCreate();
        });
      }}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Form className="max-w-xs space-y-4">
          <Input label="Name" name="name" type="text" />

          <Select
            id="type"
            label="Type"
            name="type"
            options={[
              { label: "Select a type", value: "" },
              { label: "Expense", value: "expense" },
              { label: "Income", value: "income" },
            ]}
          />

          <div className="flex justify-between">
            <button onClick={onClickCancel} type="button">
              Cancel
            </button>
            <button disabled={isSubmitting} type="submit">
              Save
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
