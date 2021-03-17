import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { CategoryId, ICategory } from "../../../../api/categories";
import { Page } from "../../../components/Page";
import { IncomesForm } from "../form";
import { createIncome } from "/imports/api/incomes/methods/create";

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
    <Page header={{ title: "Create income" }}>
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
