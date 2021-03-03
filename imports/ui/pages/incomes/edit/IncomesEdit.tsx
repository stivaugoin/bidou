import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { IIncome } from "../../../../api/incomes";
import { Select } from "../../../components/Select/Select";
import { ICategory } from "/imports/api/Categories";
import { updateIncome } from "/imports/api/incomes/methods/update";
import { Button } from "/imports/ui/components/Button/Button";
import { DatePicker } from "/imports/ui/components/DatePicker/DatePicker";
import { Input } from "/imports/ui/components/Input/Input";
import { TextArea } from "/imports/ui/components/TextArea/TextArea";

type IncomesEditProps = {
  categories: Array<Pick<ICategory, "_id" | "name">>;
  income: IIncome;
  onAfterSave: () => void;
  onClickCancel: () => void;
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
}: IncomesEditProps): JSX.Element {
  const { _id, amount, categoryId, comments, date } = income;

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
            <Button onClick={onClickCancel} type="button" variant="secondary">
              Cancel
            </Button>
            <Button disabled={isSubmitting} type="submit" variant="primary">
              Save
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
