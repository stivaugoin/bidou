import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { ICategory } from "../../../../api/categories";
import { createCategory } from "../../../../api/categories/methods/create";
import { Page } from "../../../components/Page";
import { CategoriesForm } from "../form";

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
    <Page header={{ title: "Create category" }}>
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
          <CategoriesForm
            isSubmitting={isSubmitting}
            onClickCancel={onClickCancel}
          />
        )}
      </Formik>
    </Page>
  );
}
