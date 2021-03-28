import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { CategoryId, ICategory } from "../../../../api/categories";
import { Page } from "../../../components/Page";
import { ExpensesForm } from "../form";
import { createExpense } from "/imports/api/expenses/methods/create";
import { useSnackbar } from "/imports/ui/components/Snackbar/context";

type Props = {
  categories: Array<Pick<ICategory, "_id" | "name">>;
  onAfterCreate: () => void;
  onClickCancel: () => void;
};

const validationSchema = Yup.object().shape({
  amount: Yup.number().required("Required"),
  categoryId: Yup.string().required("Required"),
  comments: Yup.string(),
  date: Yup.date().required("Required"),
});

export function ExpensesCreate({
  categories,
  onAfterCreate,
  onClickCancel,
}: Props): JSX.Element {
  const { showSnackbar } = useSnackbar();

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
          createExpense.call({
            amount: +amount * 100,
            categoryId: categoryId as CategoryId,
            comments,
            date,
          });

          setSubmitting(false);
          showSnackbar("Expense created!", "success");
          onAfterCreate();
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <ExpensesForm
            categories={categories}
            isSubmitting={isSubmitting}
            onClickCancel={onClickCancel}
          />
        )}
      </Formik>
    </Page>
  );
}
