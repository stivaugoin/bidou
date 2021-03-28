import { Formik } from "formik";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import * as Yup from "yup";
import { CategoryId, ICategory } from "../../../api/categories";
import { updateCategory } from "../../../api/categories/methods/update";
import { Button } from "../../components/Button";
import { Page } from "../../components/Page";
import { CategoriesForm } from "./components/CategoriesForm";
import { deleteCategory } from "/imports/api/categories/methods/delete";
import { IconTrash } from "/imports/ui/components/Icons/Trash";
import { useSnackbar } from "/imports/ui/components/Snackbar/context";
import { useCategories } from "/imports/ui/hooks/useCategories";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  type: Yup.mixed().oneOf(["expense", "income"]).required("Required"),
});

export function CategoriesEdit(): JSX.Element {
  const history = useHistory();
  const { categoryId } = useParams<{ categoryId: CategoryId }>();
  const { showSnackbar } = useSnackbar();
  const [category] = useCategories({ _id: categoryId });

  const handleClickDelete = () => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      deleteCategory.call(categoryId, (err) => {
        if (err) {
          window.alert(err.message);
        } else {
          history.replace("/categories");
        }
      });
    }
  };

  const handleReturnToList = () => {
    history.push("/categories");
  };

  if (!category) {
    history.replace("/categories");
  }

  const { _id, name, type } = category;

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
        title: "Edit category",
      }}
    >
      <Formik
        initialValues={{
          name,
          type,
        }}
        onSubmit={({ name, type }, { setSubmitting }) => {
          updateCategory.call(
            { _id, name, type: type as ICategory["type"] },
            () => {
              setSubmitting(false);
              showSnackbar("Category saved!", "success");
              handleReturnToList();
            }
          );
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <CategoriesForm
            isSubmitting={isSubmitting}
            onClickCancel={handleReturnToList}
          />
        )}
      </Formik>
    </Page>
  );
}
