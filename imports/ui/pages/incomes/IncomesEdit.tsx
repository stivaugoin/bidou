import { Formik } from "formik";
import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import * as Yup from "yup";
import { IncomeId, IncomesCollection } from "../../../api/incomes";
import { Button } from "../../components/Button";
import { Page } from "../../components/Page";
import { IncomesForm } from "./components/IncomesForm";
import { deleteIncome } from "/imports/api/incomes/methods/delete";
import { updateIncome } from "/imports/api/incomes/methods/update";
import { IconTrash } from "/imports/ui/components/Icons/Trash";
import { useSnackbar } from "/imports/ui/components/Snackbar/context";
import { useCategories } from "/imports/ui/hooks/useCategories";

const validationSchema = Yup.object().shape({
  amount: Yup.number().required("Required"),
  categoryId: Yup.string().required("Required"),
  comments: Yup.string(),
  date: Yup.date().required("Required"),
});

export function IncomesEdit(): JSX.Element {
  const { showSnackbar } = useSnackbar();

  const history = useHistory();
  const { incomeId } = useParams<{ incomeId: IncomeId }>();

  const categories = useCategories(
    { type: "income" },
    { fields: { _id: 1, name: 1 } }
  );

  const income = useTracker(() => IncomesCollection.findOne(incomeId), [
    incomeId,
  ]);

  const handleClickDelete = () => {
    if (window.confirm("Are you sure you want to delete this income?")) {
      deleteIncome.call(incomeId, (error) => {
        if (error) {
          showSnackbar(error.message, "error");
          return;
        }

        history.replace("/incomes");
      });
    }
  };

  const handleReturnToList = () => {
    history.push("/incomes");
  };

  if (!income) {
    return <Redirect to="/incomes" />;
  }

  const { _id, amount, categoryId, comments, date } = income;

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
        title: "Edit income",
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
          updateIncome.call(
            { _id, amount: +amount * 100, categoryId, comments, date },
            (error) => {
              setSubmitting(false);

              if (error) {
                showSnackbar(error.message, "error");
                return;
              }

              showSnackbar("Income saved!", "success");
              handleReturnToList();
            }
          );
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <IncomesForm
            categories={categories}
            isSubmitting={isSubmitting}
            onClickCancel={handleReturnToList}
          />
        )}
      </Formik>
    </Page>
  );
}
