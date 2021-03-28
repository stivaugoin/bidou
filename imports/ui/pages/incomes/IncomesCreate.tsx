import { Formik } from "formik";
import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { CategoryId } from "../../../api/categories";
import { Page } from "../../components/Page";
import { IncomesForm } from "./components/IncomesForm";
import { createIncome } from "/imports/api/incomes/methods/create";
import { useSnackbar } from "/imports/ui/components/Snackbar/context";
import { useCategories } from "/imports/ui/hooks/useCategories";

const validationSchema = Yup.object().shape({
  amount: Yup.number().required("Required"),
  categoryId: Yup.string().required("Required"),
  comments: Yup.string(),
  date: Yup.date().required("Required"),
});

export function IncomesCreate(): JSX.Element {
  const categories = useCategories(
    { type: "income" },
    { fields: { _id: 1, defaultUserId: 1, name: 1, type: 1 } }
  );
  const history = useHistory();
  const { showSnackbar } = useSnackbar();

  const currentUserId = useTracker(() => Meteor.userId());

  const defaultCategoryId =
    categories.find(({ defaultUserId }) => defaultUserId === currentUserId)
      ?._id ?? "";

  const handleClickCancel = () => {
    history.goBack();
  };

  const handleAfterCreate = () => {
    history.replace("/incomes");
  };

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
          showSnackbar("Income created!", "success");
          handleAfterCreate();
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <IncomesForm
            categories={categories}
            isSubmitting={isSubmitting}
            onClickCancel={handleClickCancel}
          />
        )}
      </Formik>
    </Page>
  );
}
