import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { IExpense } from "../../../../api/expenses";
import { Select } from "../../../components/Select/Select";
import { ICategory } from "/imports/api/Categories";
import { updateExpense } from "/imports/api/expenses/methods/update";
import { DatePicker } from "/imports/ui/components/DatePicker/DatePicker";
import { InputNumber } from "/imports/ui/components/InputNumber/InputNumber";
import { TextArea } from "/imports/ui/components/TextArea/TextArea";

type ExpensesEditProps = {
  categories: Array<Pick<ICategory, "_id" | "name">>;
  expense: IExpense;
  onAfterSave: () => void;
  onClickCancel: () => void;
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
}: ExpensesEditProps): JSX.Element {
  const { _id, amount, categoryId, comments, date } = expense;

  return (
    <Formik
      initialValues={{
        amount: (amount / 100).toFixed(2),
        categoryId,
        comments,
        date,
      }}
      onSubmit={({ amount, categoryId, comments, date }, { setSubmitting }) => {
        setSubmitting(false);
        updateExpense.call(
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
        <Form className="max-w-xs space-y-4">
          <InputNumber label="Amount" name="amount" />

          <DatePicker label="Date" name="date" />

          <Select
            label="Category"
            name="categoryId"
            options={[
              { label: "Select a category", value: "" },
              ...categories.map(({ _id, name }) => ({
                label: name,
                value: _id,
              })),
            ]}
          />

          <TextArea label="Comments" name="comments" />

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
