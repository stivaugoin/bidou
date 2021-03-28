import { Formik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { ICategory } from "../../../api/categories";
import { createCategory } from "../../../api/categories/methods/create";
import { Page } from "../../components/Page";
import { CategoriesForm } from "./components/CategoriesForm";
import { useSnackbar } from "/imports/ui/components/Snackbar/context";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  type: Yup.mixed().oneOf(["expense", "income"]).required("Required"),
});

export function CategoriesCreate(): JSX.Element {
  const { showSnackbar } = useSnackbar();
  const history = useHistory();

  const handleAfterCreate = () => {
    history.replace("/categories");
  };

  const handleClickCancel = () => {
    history.goBack();
  };

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
            showSnackbar("Category created!", "success");
            handleAfterCreate();
          });
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <CategoriesForm
            isSubmitting={isSubmitting}
            onClickCancel={handleClickCancel}
          />
        )}
      </Formik>
    </Page>
  );
}
