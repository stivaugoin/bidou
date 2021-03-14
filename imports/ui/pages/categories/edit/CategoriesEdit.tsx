import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { ICategory } from "../../../../api/categories";
import { updateCategory } from "../../../../api/categories/methods/update";
import { CategoriesForm } from "../form";
import { Button } from "/imports/ui/components/Button/Button";
import { IconTrash } from "/imports/ui/components/Icons/Trash";
import { Page } from "/imports/ui/components/Page/Page";

type CategoriesEditProps = {
  category: ICategory;
  onAfterSave: () => void;
  onClickCancel: () => void;
  onClickDelete: () => void;
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  type: Yup.mixed().oneOf(["expense", "income"]).required("Required"),
});

export function CategoriesEdit({
  category,
  onAfterSave,
  onClickCancel,
  onClickDelete,
}: CategoriesEditProps): JSX.Element {
  const { _id, name, type } = category;

  return (
    <Page
      header={{
        actions: [
          <Button key="delete" onClick={onClickDelete} variant="destructive">
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
              console.log(`${_id} updated!`);
              onAfterSave();
            }
          );
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <CategoriesForm
            isSubmitting={isSubmitting}
            onClickCancel={onClickCancel}
          />
        )}
      </Formik>
    </Page>
  );
}
