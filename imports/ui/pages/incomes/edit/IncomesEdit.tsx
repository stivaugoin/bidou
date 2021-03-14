import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { IIncome } from "../../../../api/incomes";
import { IncomesForm } from "../form";
import { ICategory } from "/imports/api/Categories";
import { updateIncome } from "/imports/api/incomes/methods/update";
import { Button } from "/imports/ui/components/Button/Button";
import { IconTrash } from "/imports/ui/components/Icons/Trash";
import { Page } from "/imports/ui/components/Page/Page";

type IncomesEditProps = {
  categories: Array<Pick<ICategory, "_id" | "name">>;
  income: IIncome;
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

export function IncomesEdit({
  categories,
  income,
  onAfterSave,
  onClickCancel,
  onClickDelete,
}: IncomesEditProps): JSX.Element {
  const { _id, amount, categoryId, comments, date } = income;

  return (
    <Page
      header={{
        actions: [
          <Button key="delete" onClick={onClickDelete} variant="destructive">
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
          <IncomesForm
            categories={categories}
            isSubmitting={isSubmitting}
            onClickCancel={onClickCancel}
          />
        )}
      </Formik>
    </Page>
  );
}
