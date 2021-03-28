import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { IExpense } from "../../../../api/expenses";
import { Button } from "../../../components/Button";
import { Page } from "../../../components/Page";
import { ExpensesForm } from "../form";
import { ICategory } from "/imports/api/Categories";
import { updateExpense } from "/imports/api/expenses/methods/update";
import { IconTrash } from "/imports/ui/components/Icons/Trash";
import { useSnackbar } from "/imports/ui/components/Snackbar/context";

type ExpensesEditProps = {
  categories: Array<Pick<ICategory, "_id" | "name">>;
  expense: IExpense;
  onAfterSave: () => void;
  onClickCancel: () => void;
  onClickDelete: () => void;
};

const validationSchema = Yup.object().shape({
  amount: Yup.number().required("Required"),
  categoryId: Yup.string().required("Required"),
  comments: Yup.string(),
  date: Yup.date().required("Required"),
});

export function ExpensesEdit({
  categories,
  expense,
  onAfterSave,
  onClickCancel,
  onClickDelete,
}: ExpensesEditProps): JSX.Element {
  const { showSnackbar } = useSnackbar();
  const { _id, amount, categoryId, comments, date } = expense;

  return (
    <Page
      header={{
        actions: [
          <Button key="delete" onClick={onClickDelete} variant="destructive">
            <IconTrash />
          </Button>,
        ],
        title: "Edit expense",
      }}
    >
      <Formik
        initialValues={{
          amount: (amount / 100).toFixed(2),
          categoryId,
          comments,
          date,
        }}
        onSubmit={(
          { amount, categoryId, comments, date },
          { setSubmitting }
        ) => {
          setSubmitting(false);
          updateExpense.call(
            { _id, amount: +amount * 100, categoryId, comments, date },
            () => {
              setSubmitting(false);
              showSnackbar("Expense saved!", "success");
              onAfterSave();
            }
          );
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
