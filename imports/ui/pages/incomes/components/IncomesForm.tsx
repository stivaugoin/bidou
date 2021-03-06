import { Form } from "formik";
import React from "react";
import { Button } from "../../../components/Button";
import { Card } from "../../../components/Card";
import { DatePicker } from "../../../components/Form/DatePicker";
import { Input } from "../../../components/Form/Input";
import { Select } from "../../../components/Form/Select";
import { TextArea } from "../../../components/Form/TextArea";
import { ICategory } from "/imports/api/categories";

type Props = {
  categories: Array<Pick<ICategory, "_id" | "name">>;
  isSubmitting: boolean;
  onClickCancel: () => void;
};

export function IncomesForm({
  categories,
  isSubmitting,
  onClickCancel,
}: Props): JSX.Element {
  return (
    <Card>
      <div className="max-w-md mx-auto">
        <Form>
          <Input
            id="amount"
            label="Amount"
            name="amount"
            step=".01"
            type="number"
          />

          <DatePicker id="date" label="Date" name="date" />

          <Select
            id="categoryId"
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

          <TextArea id="comments" label="Comments" name="comments" />

          <div className="flex justify-between">
            <Button onClick={onClickCancel} type="button" variant="secondary">
              Cancel
            </Button>
            <Button disabled={isSubmitting} type="submit" variant="primary">
              Save
            </Button>
          </div>
        </Form>
      </div>
    </Card>
  );
}
