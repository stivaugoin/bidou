import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { CategoryId, ICategory } from "../../../../api/categories";
import { DatePicker } from "../../../components/DatePicker/DatePicker";
import { Select } from "../../../components/Select/Select";
import { TextArea } from "../../../components/TextArea/TextArea";
import { createExpense } from "/imports/api/expenses/methods/create";
import { Input } from "/imports/ui/components/Input/Input";

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
  return (
    <>
      <h1>Create Expense</h1>
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
          onAfterCreate();
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form className="max-w-xs space-y-4">
            <Input label="Amount" name="amount" type="number" />

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
    </>
  );
}
