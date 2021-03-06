import cn from "classnames";
import { FieldHookConfig, useField } from "formik";
import React from "react";
import { FormField } from "../FormField";

type SelectProps = FieldHookConfig<string> & {
  id: string;
  label: string;
  options: Array<{
    label: string;
    value: string;
  }>;
};

export function Select(props: SelectProps): JSX.Element {
  const [field, meta] = useField(props);
  const hasError = meta.touched && meta.error;

  return (
    <FormField
      error={hasError ? meta.error : ""}
      id={props.id}
      label={props.label}
    >
      <select
        className={cn(
          {
            "form-field": !hasError,
            "form-field-error": hasError,
          },
          props.className
        )}
        {...field}
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FormField>
  );
}
