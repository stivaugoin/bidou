import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { CategoryId, ICategory } from "../../../../api/categories";
import { DatePicker } from "../../../components/DatePicker/DatePicker";
import { Select } from "../../../components/Select/Select";
import { TextArea } from "../../../components/TextArea/TextArea";
import { createIncome } from "/imports/api/incomes/methods/create";
import { Button } from "/imports/ui/components/Button/Button";
import { Input } from "/imports/ui/components/Input/Input";

type Props = {
  categories: Array<Pick<ICategory, "_id" | "name">>;
  defaultCategoryId: CategoryId | "";
  onAfterCreate: () => void;
  onClickCancel: () => void;
};

const validationSchema = Yup.object().shape({
  amount: Yup.number().required("Required"),
  categoryId: Yup.string().required("Required"),
  comments: Yup.string(),
  date: Yup.date().required("Required"),
});

export function IncomesCreate({
  categories,
  defaultCategoryId,
  onAfterCreate,
  onClickCancel,
}: Props): JSX.Element {
  return (
    <>
      <h1>Create Income</h1>
      <Formik
        initialValues={{
          amount: "",
          categoryId: defaultCategoryId,
          comments: "",
          date: new Date(),
        }}
        onSubmit={(
          { amount, categoryId, comments, date },
          { setSubmitting }
        ) => {
          createIncome.call({
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
    </>
  );
}
