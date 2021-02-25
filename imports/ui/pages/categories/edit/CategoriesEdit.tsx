import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { ICategory } from "../../../../api/categories";
import { updateCategory } from "../../../../api/categories/methods/update";
import { InputText } from "../../../components/InputText/InputText";
import { Select } from "../../../components/Select/Select";

type CategoriesEditProps = {
  category: ICategory;
  onAfterSave: () => void;
  onClickCancel: () => void;
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  type: Yup.mixed().oneOf(["expense", "income"]).required("Required"),
});

export function CategoriesEdit({
  category,
  onAfterSave,
  onClickCancel,
}: CategoriesEditProps): JSX.Element {
  const { _id, name, type } = category;

  return (
    <Formik
      initialValues={{
        name,
        type,
      }}
      onSubmit={({ name, type }, { setSubmitting }) => {
        updateCategory.call(
          { _id, name, type: type as ICategory["type"] },
          () => {
            setSubmitting(false);
            console.log(`${_id} updated!`);
            onAfterSave();
          }
        );
      }}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Form className="max-w-xs space-y-4">
          <InputText id="name" label="Name" name="name" />

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
