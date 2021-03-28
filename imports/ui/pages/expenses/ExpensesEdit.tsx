import { Formik } from "formik";
import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import * as Yup from "yup";
import { ExpenseId, ExpensesCollection } from "../../../api/expenses";
import { Button } from "../../components/Button";
import { Page } from "../../components/Page";
import { ExpensesForm } from "./components/ExpensesForm";
import { deleteExpense } from "/imports/api/expenses/methods/delete";
import { updateExpense } from "/imports/api/expenses/methods/update";
import { IconTrash } from "/imports/ui/components/Icons/Trash";
import { useSnackbar } from "/imports/ui/components/Snackbar/context";
import { useCategories } from "/imports/ui/hooks/useCategories";

const validationSchema = Yup.object().shape({
  amount: Yup.number().required("Required"),
  categoryId: Yup.string().required("Required"),
  comments: Yup.string(),
  date: Yup.date().required("Required"),
});

export function ExpensesEdit(): JSX.Element {
  const categories = useCategories(
    { type: "expense" },
    { fields: { _id: 1, name: 1 } }
  );
  const history = useHistory();
  const { expenseId } = useParams<{ expenseId: ExpenseId }>();
  const { showSnackbar } = useSnackbar();

  const expense = useTracker(() => ExpensesCollection.findOne(expenseId), [
    expenseId,
  ]);

  const handleClickDelete = () => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      deleteExpense.call(expenseId, (error) => {
        if (error) {
          showSnackbar(error.message, "error");
          return;
        }

        history.replace("/expenses");
      });
    }
  };

  const handleReturnToList = () => {
    history.push("/expenses");
  };

  if (!expense) {
    return <Redirect to="/expenses" />;
  }

  const { _id, amount, categoryId, comments, date } = expense;

  return (
    <Page
      header={{
        actions: [
          <Button
            key="delete"
            onClick={handleClickDelete}
            variant="destructive"
          >
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
            (error) => {
              setSubmitting(false);

              if (error) {
                showSnackbar(error.message, "error");
                return;
              }

              showSnackbar("Expense saved!", "success");
              handleReturnToList();
            }
          );
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <ExpensesForm
            categories={categories}
            isSubmitting={isSubmitting}
            onClickCancel={handleReturnToList}
          />
        )}
      </Formik>
    </Page>
  );
}
