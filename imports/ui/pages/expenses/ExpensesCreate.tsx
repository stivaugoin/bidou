import { Formik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { CategoryId } from "../../../api/categories";
import { Page } from "../../components/Page";
import { ExpensesForm } from "./components/ExpensesForm";
import { createExpense } from "/imports/api/expenses/methods/create";
import { useSnackbar } from "/imports/ui/components/Snackbar/context";
import { useCategories } from "/imports/ui/hooks/useCategories";

const validationSchema = Yup.object().shape({
  amount: Yup.number().required("Required"),
  categoryId: Yup.string().required("Required"),
  comments: Yup.string(),
  date: Yup.date().required("Required"),
});

export function ExpensesCreate(): JSX.Element {
  const categories = useCategories({ type: "expense" });
  const history = useHistory();
  const { showSnackbar } = useSnackbar();

  const handleClickCancel = () => {
    history.goBack();
  };

  const handleAfterCreate = () => {
    history.replace("/expenses");
  };

  return (
    <Page header={{ title: "Create expense" }}>
      <Formik
        initialValues={{
          amount: "",
          categoryId: "",
          comments: "",
          date: new Date(),
        }}
        onSubmit={(
          { amount, categoryId, comments, date },
          { setSubmitting }
        ) => {
          createExpense.call(
            {
              amount: +amount * 100,
              categoryId: categoryId as CategoryId,
              comments,
              date,
            },
            (error) => {
              setSubmitting(false);

              if (error) {
                showSnackbar(error.message, "error");
                return;
              }

              showSnackbar("Expense created!", "success");
              handleAfterCreate();
            }
          );
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <ExpensesForm
            categories={categories}
            isSubmitting={isSubmitting}
            onClickCancel={handleClickCancel}
          />
        )}
      </Formik>
    </Page>
  );
}
