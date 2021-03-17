import { Form } from "formik";
import React from "react";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Input } from "../../components/Form/Input";
import { Select } from "../../components/Form/Select";

type Props = {
  isSubmitting: boolean;
  onClickCancel: () => void;
};

export function CategoriesForm({
  isSubmitting,
  onClickCancel,
}: Props): JSX.Element {
  return (
    <Card>
      <div className="max-w-md mx-auto">
        <Form>
          <Input id="name" label="Name" name="name" type="text" />

          <Select
            id="type"
            label="Type"
            name="type"
            options={[
              { label: "Select a type", value: "" },
              { label: "Expense", value: "expense" },
              { label: "Income", value: "income" },
            ]}
          />

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
